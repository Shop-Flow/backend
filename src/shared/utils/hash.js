import bcrypt from "bcryptjs";
import { env } from "../../config/env.config.js";

export const hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, Number(env.SALT_ROUNDS));
};

export const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
