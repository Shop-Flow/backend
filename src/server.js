import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";

const start = async () => {
  await connectDB();
  const port = env.PORT || 8000;
  app.listen(port, () => console.log(`Server running on port: ${port}`));
};

start();
