import express from "express";
import { getTasks, addTask } from "../controllers/taskController";

const router = express.Router();

router.get("/tasks", getTasks).post("/tasks", addTask);

export default router;
