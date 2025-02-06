import mongoose from "mongoose";
// import { DB_NAME } from "../constants";


const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI environment variable is not defined");
        }
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("ERROR:", error);
        process.exit(1);
    }
}

export default connectDB;



// assignment console.log(Instance.connection.host)
// import express from "express";
// const app = express();
// const connectDB = async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//         app.on("error", (error) => {
//             console.log("ERROR:", error);
//             throw error;
//         });
//         app.listen(process.env.PORT, () => {
//             console.log(`App is running on port ${process.env.PORT}`);
//         });
//     } catch (error) {
//         console.error("ERROR:", error);
//         throw error;
//     }
// };
//connectDB();