import mongoose from "mongoose";
import { title } from "process";

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  priority: String,
  dueDate: Date,
});

export const Task = mongoose.model("Task", taskSchema);
