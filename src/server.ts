// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import { notFound } from "./controllers/notFoundController";
import testRoutes from "./routes/exampleRoutes";
import { helloMiddleware } from "./middleware/exampleMiddleware";
import mongoose from "mongoose";
import { errorHandler } from "./middleware/errorHandler";

// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", helloMiddleware, testRoutes);
app.all("*splat", notFound);

// Error handling (must be the last)
app.use(errorHandler);

// Database connection
try {
  await mongoose.connect(process.env.MONGO_URI!);
  console.log("Database connection OK");
} catch (err) {
  console.error(err);
  process.exit(1);
}

// Server Listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}! 🚀`);
});
