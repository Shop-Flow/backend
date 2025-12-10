import Joi from "joi";

//⭐ login
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email address",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
  role: Joi.string().valid("distributor", "retailer").required().messages({
    "any.only": "Role must be either distributor or retailer",
    "string.empty": "Role is required",
  }),
});

//⭐ register
const addressSchema = Joi.object({
  street: Joi.string().trim().optional(),
  city: Joi.string().trim().optional(),
  state: Joi.string().trim().optional(),
  country: Joi.string().trim().optional(),
  postalCode: Joi.string().trim().optional(),
});

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters long",
    "string.max": "Name cannot exceed 100 characters",
  }),
  email: Joi.string().email().lowercase().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email address",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
  role: Joi.string()
    .valid("SUPERADMIN", "DISTRIBUTOR", "RETAILER")
    .required()
    .messages({
      "any.only": "Role must be either distributor, retailer or superadmin",
      "string.empty": "Role is required",
    }),
  phone: Joi.string().trim().optional(),
  companyName: Joi.string().trim().optional(),
  address: addressSchema.optional(),
  creditLimit: Joi.number().when("role", {
    is: "retailers",
    then: Joi.number().optional(),
    otherwise: Joi.forbidden(),
  }),
  profilePic: Joi.string().uri().optional().messages({
    "string.uri": "Profile picture must be a valid URI",
  }),
  isActive: Joi.boolean().default(false),
  isEmailVerified: Joi.boolean().default(false),
  verificationToken: Joi.string().optional().default(""),
});
