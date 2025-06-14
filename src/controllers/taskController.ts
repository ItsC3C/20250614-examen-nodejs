import { Request, Response } from "express";
import { Task } from "../models/taskModel";

export const getTasks = async (req: Request, res: Response) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
};

export const addTask = async (req: Request, res: Response) => {
  const { title, description, category, priority, dueDate } = req.body;
  const task = await Task.create({
    title,
    description,
    category,
    priority,
    dueDate,
  });
  res.status(201).json(task);
};

// export const updateTask = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { title, description, category, priority, dueDate } = req.body;
//   const task = await Task.findByIdAndUpdate(
//     id,
//     { title, description, category, priority, dueDate },
//     { new: true }
//   );
//   res.status(200).json(task);
// };
