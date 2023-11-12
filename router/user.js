import express from "express";
import { getUser, login, logout, register } from "../controllers/user.js";
import { authenticate } from "../middlewere/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/my", authenticate ,getUser);

export default router;