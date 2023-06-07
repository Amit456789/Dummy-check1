import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connection = await mongoose.connect(process.env.MONGO_DB_URL);
