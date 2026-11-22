import express from "express";
import cors from "cors";
import "dotenv/config.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import { registerRoutes } from "./routes/index.js";
import { errorHandler } from "./middleware/error-handler.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

registerRoutes(app);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
