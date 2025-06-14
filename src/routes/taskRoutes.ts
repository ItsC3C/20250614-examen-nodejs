import express from "express";
import {
  getAllTasks,
  addTask,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

const router = express.Router();

router.get("/", getAllTasks);
router.post("/", addTask);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
