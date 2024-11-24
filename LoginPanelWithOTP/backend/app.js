const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Middleware
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Database connection (exported from a separate module)
const Connect = require("./Database/Connect");
// Connect();

// Routes
const routes = require("./routes");
app.use("/", routes);

module.exports = app;
