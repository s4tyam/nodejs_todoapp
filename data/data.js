import mongoose from "mongoose";

export const connectDB = ()=> {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "backendAPI"
    }).then((c)=> {
        console.log(`Database connected with ${c.connection.host}`)
    })
}