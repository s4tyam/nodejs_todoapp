import express from "express";
import { deleteTask, myTask, newTask, updateTask } from "../controllers/task.js";
import { authenticate } from "../middlewere/auth.js";

const router = express.Router();

router.post("/new", authenticate, newTask);
router.get("/my", authenticate ,myTask);

router.route("/:id").put(updateTask).delete(deleteTask)

export default router;