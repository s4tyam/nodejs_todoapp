import { app } from "./app.js";
import {connectDB} from "./data/data.js";

connectDB();

app.listen(process.env.PORT, ()=> {
    console.log(`Server is connecting to port ${process.env.PORT} and in the ${process.env.NODE_ENV} mode`);
})