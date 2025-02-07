import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import {ConnectDB} from "./database/db.js"

const app = express();
dotenv.config();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
 console.log(`Port started at : ${process.env.PORT}`)
 ConnectDB()
});
