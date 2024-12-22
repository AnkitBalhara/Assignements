import express from "express";
const app = express();

import cors from "cors";
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));

import cookieParser from "cookie-parser";
app.use(cookieParser());

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

import { connectDB } from "./DataBase/db.js";

import dotenv from "dotenv";
dotenv.config();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/message", messageRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is started at Port : ${process.env.PORT}`);
  connectDB();
});
