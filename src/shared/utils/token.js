import jwt from "jsonwebtoken";
import { env } from "../../config/env.config.js";
import crypto from "crypto";

export const generateJwtToken = (payload) => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
};

export const generateRandomToken = () => crypto.randomBytes(16).toString("hex");
