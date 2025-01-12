import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected Successfully,${connect.connection.host}`);
  } catch (error) {
    console.log(`MongoDB connection Error:- ${error}`);
  }
};
