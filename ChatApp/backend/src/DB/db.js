import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connection Successful:-", connection.connection.host);
  } catch (error) {
    console.log("MongoDB connection Error", error);
  }
};
