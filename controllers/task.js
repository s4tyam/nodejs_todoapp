import { Task } from "../modles/task.js";
import ErrorHandler from "../middlewere/error.js";

export const newTask =async (req, res, next)=> {
    try {
        const {title, description} = req.body;

        await Task.create({title, description, user: req.user});

        res.status(201).json({
            success: true,
            message: "Task Created Successfully"
        })
    } catch (error) {
        next(error);
    }
}

export const updateTask =async (req, res, next)=> {
    try {
        const {id} = req.params;

        const task = await Task.findById(id);

        if(!task) return next(new ErrorHandler("Invalid ID", 400));

        task.isCompleted = !task.isCompleted;

        res.status(200).json({
            success: true,
            message:"Task Update Successfully"
    })
    } catch (error) {
        next(error);
    }
}

export const deleteTask =async (req, res, next)=> {
    try {
        const {id} = req.params;

        const task = await Task.findById(id);

        if(!task) return next(new ErrorHandler("Invalid ID", 404));

        await Task.deleteOne(task);

        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        })
    } catch (error) {
        next(error);
    }
}

export const myTask = async (req, res, next)=> {
    try {
        const userId = req.user._id;

        const tasks = await Task.find({user: userId});

        res.status(200).json({
            success: true,
            tasks
        })
    } catch (error) {
        next(error);
    }
}