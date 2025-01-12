import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
app.use(cookieParser())

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server  Started");
});
