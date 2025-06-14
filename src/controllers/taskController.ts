import { Request, Response } from "express";
import { Task } from "../models/taskModel";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const {
      category,
      priority,
      page,
      limit,
      sort = "dueDate",
      order = "asc",
    } = req.query;

    const filter: any = {
      ...(category && {
        category: { $regex: new RegExp(category as string, "i") },
      }),
      ...(priority && {
        priority: { $regex: new RegExp(priority as string, "i") },
      }),
    };

    const query = Task.find(filter).sort({
      [sort as string]: order === "desc" ? -1 : 1,
    });

    if (page && limit) {
      const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
      query.skip(skip).limit(parseInt(limit as string));

      const [tasks, total] = await Promise.all([
        query,
        Task.countDocuments(filter),
      ]);

      return res.status(200).json();
    }

    const tasks = await query;
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Interne serverfout", error: err });
  }
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
