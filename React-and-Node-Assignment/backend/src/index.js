import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"

const app = express();
dotenv.config();


app.use("/api/auth",authRoutes)

app.listen(process.env.PORT, () => {
  console.log("Server  Started");
});
