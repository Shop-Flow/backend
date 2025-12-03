import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import User from "../../database/models/user.model.js";
import ApiError from "../utils/ApiError.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer "))
      throw new ApiError(401, "Unauthorized");

    const token = header.split(" ")[1];
    const payload = jwt.verify(token, env.JWT_SECRET);
    const user = await User.findById(payload.id).select("-password");

    if (!user) throw new ApiError(401, "Unauthorized");

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
