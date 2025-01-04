import express from "express";
const app = express();

import cookieParser from "cookie-parser";
app.use(cookieParser());

import cors from "cors";
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

import authRoutes from "./routes/auth.route.js";

import { connectDB } from "./DataBase.js";

import dotenv from "dotenv";
dotenv.config();

app.use(express.json());

app.use("/api/auth", authRoutes);

// app.use("/api/messages", messageRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is started at Port : ${process.env.PORT}`);
  connectDB();
});
