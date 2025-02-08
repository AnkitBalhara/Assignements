import express from "express";
import {app, server} from "./lib/socket.js"
import cookieParser from "cookie-parser";
import cors from "cors";

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));

app.use(cookieParser());

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

import { connectDB } from "./DataBase/db.js";

import dotenv from "dotenv";
dotenv.config();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/messages", messageRoutes);

server.listen(process.env.PORT, () => {
  console.log(`Server is started at Port : ${process.env.PORT}`);
  connectDB();
});
