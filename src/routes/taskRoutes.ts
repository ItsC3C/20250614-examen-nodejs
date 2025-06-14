import express from "express";
import {
  getAllTasks,
  addTask,
  getTaskById,
} from "../controllers/taskController";

const router = express.Router();

router.get("/", getAllTasks);
router.post("/", addTask);
router.get("/:id", getTaskById);

export default router;
