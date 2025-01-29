// import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config(
    {
          path: './env'
    }
);

// const connectDB = async () => {
//   try {
// 	const connection = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
// 	console.log(`MongoDB connected: ${connection.connection.host}`);
//   } catch (error) {
// 	console.log("Error connecting to database:", error);
// 	process.exit(1);
//   }
// };

connectDB();