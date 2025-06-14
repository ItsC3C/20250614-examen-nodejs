import { Request, Response } from "express";
import { Task } from "../models/taskModel";

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const { category, priority, page, limit, sort, order } = req.query;

    const filter: any = {
      ...(category && {
        category: { $regex: new RegExp(String(category), "i") },
      }),
      ...(priority && {
        priority: { $regex: new RegExp(String(priority), "i") },
      }),
    };

    let query = Task.find(filter);

    if (sort && order) {
      query = query.sort({ [String(sort)]: order === "asc" ? 1 : -1 });
    }

    if (page && limit) {
      const skip = (Number(page) - 1) * Number(limit);
      query = query.skip(skip).limit(Number(limit));
    }

    const tasks = await query;
    const now = new Date();

    const upcomingTasks = tasks.filter(
      (task) => task.dueDate && new Date(task.dueDate) >= now
    );

    res.status(200).json(upcomingTasks);
  } catch (error) {
    res.status(500).json({ message: "Interne serverfout", error });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json({ message: "Taak niet gevonden" });
      return;
    }
    const now = new Date();
    if (task.dueDate && new Date(task.dueDate) < now) {
      res.status(400).json({ message: "Taak is verlopen" });
      return;
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Interne serverfout", error });
  }
};

export const addTask = async (req: Request, res: Response) => {
  const { title, description, category, priority, dueDate } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      category,
      priority,
      dueDate,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Interne serverfout", error: err });
  }
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
