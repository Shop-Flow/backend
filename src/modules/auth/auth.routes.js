import { Router } from "express";
import { login, register, verifyEmail } from "./auth.controller.js";
import { validateBody } from "../../shared/middleware/validate.middleware.js";
import { loginSchema, registerSchema } from "./auth.validator.js";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";

const router = Router();

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.patch("/verifyEmail/:token", verifyEmail);

export default router;
