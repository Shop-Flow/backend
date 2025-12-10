import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import routes from "./modules/index.routes.js";
import { errorHandler } from "./shared/middleware/error.middleware.js";
import { env } from "./config/env.config.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
if (env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use("/api", routes);

app.use("/health", (req, res) =>
  res.status(200).json({ success: true, message: "Server health is Good! 🟢" })
);

app.use(errorHandler);

export default app;
