import * as authService from "./auth.service.js";
import { ApiResponse } from "../../shared/utils/ApiResponse.js";
import { catchAsync } from "../../shared/utils/catchAsync.js";
import { findByTokenAndVerify } from "./auth.repo.js";
import ApiError from "../../shared/utils/ApiError.js";

export const register = catchAsync(async (req, res) => {
  const data = await authService.registerUser(req.body);
  res.status(201).json(new ApiResponse(201, data, "User created"));
});

export const login = catchAsync(async (req, res) => {
  const data = await authService.loginUser(req.body);
  res.status(200).json(new ApiResponse(200, data, "Login successful"));
});

export const verifyEmail = catchAsync(async (req, res) => {
  const { token } = req?.params;
  const user = await findByTokenAndVerify(token);
  console.log(user);

  if (!user) throw new ApiError(404, "Verification token is not valid");

  res?.status(200)?.json({
    success: true,
    message: "Email verified Successfully!",
    userData: {
      email: user?.email,
      name: user?.name,
    },
  });
});
