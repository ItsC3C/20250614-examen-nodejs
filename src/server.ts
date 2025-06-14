import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { Task } from "./models/taskModel";
import taskRoutes from "./routes/taskRoutes";
import { notFound } from "./controllers/notFoundController";
import { errorHandler } from "./middleware/errorHandler";

// App-configuratie
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(express.static("src/public"));

// Homepagina met EJS-rendering + filtering
app.get("/", async (req, res) => {
  try {
    const { category, priority } = req.query;

    const filter: any = {
      dueDate: { $gte: new Date() },
    };

    if (category)
      filter.category = { $regex: new RegExp(category as string, "i") };
    if (priority)
      filter.priority = { $regex: new RegExp(priority as string, "i") };

    const tasks = await Task.find(filter).sort({ dueDate: 1 });
    const categories = await Task.distinct("category");
    const priorities = await Task.distinct("priority");

    res.render("index", {
      tasks,
      categories,
      priorities,
      selectedCategory: category || "",
      selectedPriority: priority || "",
    });
  } catch (err) {
    console.error("Fout bij laden van taken:", err);
    res.status(500).send("Er ging iets mis bij het ophalen van de taken.");
  }
});

// Routes
app.use("/api/tasks", taskRoutes);
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
