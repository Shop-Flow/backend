import bcrypt from "bcryptjs";

import { env } from "../../config/env.js";

export const hashPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, Number(process.env.SALT_ROUNDS));
};

export const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
