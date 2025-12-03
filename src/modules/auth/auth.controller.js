import * as authService from "./auth.service.js";
import { ApiResponse } from "../../shared/utils/ApiResponse.js";
import { catchAsync } from "../../shared/utils/catchAsync.js";

export const register = catchAsync(async (req, res) => {
  const data = await authService.registerUser(req.body);
  res.status(201).json(new ApiResponse(201, data, "User created"));
});

export const login = catchAsync(async (req, res) => {
  const data = await authService.loginUser(req.body);
  res.status(200).json(new ApiResponse(200, data, "Login successful"));
});

export const me = catchAsync(async (req, res) => {
  res.status(200).json(new ApiResponse(200, { user: req.user }, "OK"));
});
