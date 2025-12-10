import * as authRepo from "./auth.repo.js";
import ApiError from "../../shared/utils/ApiError.js";
import {
  generateJwtToken,
  generateRandomToken,
} from "../../shared/utils/token.js";
import { comparePassword, hashPassword } from "../../shared/utils/hash.js";
import { sendEmail } from "../../shared/utils/sendEmail.js";
import { verificationTemplate } from "../../shared/utils/emailTemplates.js";

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
}) => {
  const existing = await authRepo.findByEmail(email);
  if (existing) throw new ApiError(409, "Email already in use");

  const hashed = await hashPassword(password);
  const user = await authRepo.createUser({
    name,
    email,
    password: hashed,
    role,
    phone,
    companyName,
    address,
    creditLimit,
    profilePic,
  });

  // generating JWT TOKEN
  const token = generateJwtToken({ id: user._id });

  // generating EMAIL VERIFICATION TOKEN and SAVE IN DB
  const emailVerificationToken = generateRandomToken();
  user.verificationToken = emailVerificationToken;
  await user.save();

  // sending MAIL
  let emailTemplate = verificationTemplate({
    token: emailVerificationToken,
    name: user?.name,
    role: user?.role,
  });
  await sendEmail({
    to: user?.email,
    subject: "Welcome to Shopflow!",
    html: emailTemplate,
  });

  // Hide PASSWORD before returning
  const userData = user.toObject();
  delete userData.password;

  return {
    success: true,
    message: "User Register Successfully! Check Mail for verification",
    user: userData,
    token,
  };
};

export const loginUser = async ({ email, password, role }) => {
  const user = await authRepo.findByEmail(email);
  if (!user) throw new ApiError(404, "User not found");

  const match = await comparePassword(password, user.password);
  if (!match) throw new ApiError(401, "Invalid credentials");

  const checkRole = role === user.role;
  if (checkRole)
    throw new ApiError(403, "Access denied. Insufficient role permissions.");

  const token = generateJwtToken({ id: user._id });

  // Hide password before returning
  delete user.password;

  return { user, token };
};
