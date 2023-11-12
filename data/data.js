import mongoose from "mongoose";

export const connectDB = ()=> {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "backendAPI"
    }).then(()=> {
        console.log("mongodb connected")
    })
}