import express from "express";
const app = express();
import cookieParser from "cookie-parser";
app.use(cookieParser());
import AuthRoutes from "./routes/auth.route.js";
import { connectDB } from "./DataBase/db.js";
import dotenv from "dotenv";
dotenv.config();

app.use(express.json());
app.use("/api/auth", AuthRoutes);
app.listen(process.env.PORT, () => {
  console.log(`Server is started at Port : ${process.env.PORT}`);
  connectDB();
});
