
import jwt from "jsonwebtoken";


export const sendCookie =async (user, res, statusCode, message)=> {
    const token = await jwt.sign({_id: user._id}, process.env.JWT_Secret);
    
    res.status(statusCode).cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite: process.env.NODE_ENV == "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV == "Development" ? false : true
    }).json({
        succuss: true,
        message
    })
}