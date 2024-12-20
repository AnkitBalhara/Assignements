import express from "express";
import AuthRoutes from "./routes/auth.route.js";
import { connectDB } from "./DataBase/db.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());
import cookieParser from "cookie-parser";
app.use("/api/auth", AuthRoutes);
app.use(cookieParser());
app.listen(process.env.PORT, () => {
  console.log(`Server is started at Port : ${process.env.PORT}`);
  connectDB();
});
