import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: String,
    priority: String,
    dueDate: Date,
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model("Task", taskSchema);
