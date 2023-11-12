import { User } from "../modles/user.js";
import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next)=> {
    const {token} = req.cookies;

    if(!token) return res.status(404).json({
        succuss: false,
        message: "Login First"
    })

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decode._id);
    next();
}