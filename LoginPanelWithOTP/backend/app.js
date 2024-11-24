const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./Database/Connect");
const authRoutes = require("./routes/authRoutes");
const otpRoutes = require("./routes/otpRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Database Connection
connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/otp", otpRoutes);
app.use("/user", userRoutes);

module.exports = app;
