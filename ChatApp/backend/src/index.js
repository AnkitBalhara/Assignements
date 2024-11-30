import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import { connectDB } from "./DB/db.js";
connectDB();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

app.get("/", (req, res) => {
  res.json({ message: "Jai SiyaRam" });
});

app.listen(PORT, () => {
  console.log(`Server Started at Port :- http://localhost:${PORT}`);
});
