import express from "express";
import { config } from "dotenv";
import userRouter from "./router/user.js";
import taskRouter from "./router/task.js";
import cookieParser from "cookie-parser";
import { errorMiddleWear } from "./middlewere/error.js";
import cors from "cors";

export const app = express();
app.use(express.json());

config({
    path: "./data/config.env"
})


// middleweare
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}))
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

app.get("/", (req, res) => {
    res.send("<h1>Nice working</h1>");
})

app.use(errorMiddleWear);