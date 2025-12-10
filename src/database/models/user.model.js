import mongoose from "mongoose";
const address = new mongoose.Schema(
  {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    country: { type: String, trim: true },
    postalCode: { type: String, trim: true },
  },
  { _id: false }
);
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, min: 2, max: 100 },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, min: 6 },
    role: {
      type: String,
      require: true,
      enum: ["SUPERADMIN", "DISTRIBUTOR", "RETAILER"],
    },
    phone: { type: String, trim: true },
    companyName: { type: String, trim: true },
    address: address,
    // Only for retailers (optional credit feature)
    creditLimit: { type: Number, default: 0 },
    profilePic: { type: String, default: null },
    isActive: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    verificationToken: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
