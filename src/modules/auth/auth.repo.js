import User from "../../database/models/user.model.js";

export const findByEmail = (email) => User.findOne({ email }).lean();
export const create = (payload) => User.create(payload);
