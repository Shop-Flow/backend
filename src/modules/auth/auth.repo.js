import User from "../../database/models/user.model.js";

export const findByEmail = (email) => User.findOne({ email }).lean();

export const createUser = (payload) => User.create(payload);

export const findByVerificationTokenAndUpdate = (verificationToken) =>
  User.findOneAndUpdate(
    { verificationToken },
    { isActive: true, isEmailVerified: true }
  );

export const findByTokenAndVerify = (token) =>
  User.findOneAndUpdate(
    { verificationToken: token },
    { isActive: true, isEmailVerified: true },
    { new: true }
  );
