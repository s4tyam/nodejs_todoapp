import { User } from "../modles/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/sendcookie.js";
import ErrorHandler from "../middlewere/error.js";

export const register = async (req, res, next)=> {
    try {
        const {name, email, password} = req.body;
        const hashPassword = await bcrypt.hash(password,10);

        const user = await User.create({name, email, password: hashPassword});

        sendCookie(user, res, 201, "Registered Successfully");
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next)=> {
    try {
        const {email, password} = req.body;

        let user = await User.findOne({email});
        if(!user) return next(new ErrorHandler("Register First, Email not found", 400));

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return next(new ErrorHandler("Incorrect email or password", 400));

        sendCookie(user, res, 200, `Welcome ${user.name}`);
    } catch (error) {
        next(error);
    }
}

export const logout = (req, res, next) => {
    try {
        res.status(200).cookie("token", "null", {
            httpOnly: true,
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV == "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV == "Development" ? false : true
        }).json({
            succuss: true,
            message: "Logout Successfully"
        })
    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next)=> {

    try {
        res.status(200).json({
            succuss: true,
            user: req.user
        })
    } catch (error) {
        next(error);
    }

}