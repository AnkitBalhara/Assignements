import mongoose from "mongoose";

export const ConnectDB = async () => {
  console.log(process.env.MONGO_URI)
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected at :- ${connect.connection.host}`);
  } catch (error) {
    console.log(`MongoDB connection Error:- ${error}`);
  }
};
