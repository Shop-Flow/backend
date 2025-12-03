import * as authRepo from "./auth.repo.js";
import ApiError from "../../shared/utils/ApiError.js";
import { generateToken } from "../../shared/utils/generateToken.js";
import { comparePassword, hashPassword } from "../../shared/utils/hash.js";

export const registerUser = async ({
  name,
  email,
  password,
  role,
  phone,
  companyName,
  address,
  creditLimit,
  profilePic,
  status,
}) => {
  const existing = await authRepo.findByEmail(email);
  if (existing) throw new ApiError(409, "Email already in use");

  const hashed = await hashPassword(password);
  const user = await authRepo.create({
    name,
    email,
    password: hashed,
    role,
    phone,
    companyName,
    address,
    creditLimit,
    profilePic,
    status: "active",
  });
  const token = generateToken({ id: user._id });

  // Hide password before returning
  const userData = user.toObject();
  delete userData.password;

  return { user: userData, token };
};

export const loginUser = async ({ email, password, role }) => {
  const user = await authRepo.findByEmail(email);
  if (!user) throw new ApiError(404, "User not found");

  const match = await comparePassword(password, user.password);
  if (!match) throw new ApiError(401, "Invalid credentials");

  const checkRole = role === user.role;
  if (checkRole)
    throw new ApiError(403, "Access denied. Insufficient role permissions.");

  const token = generateToken({ id: user._id });

  // Hide password before returning
  delete user.password;

  return { user, token };
};
