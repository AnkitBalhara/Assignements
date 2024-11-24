// const app = require("./app");

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server started on http://localhost:${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const Connect = require("./Database/Connect");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Middleware..
const { sendEmail, transporter } = require("./Utils/sendEmail.js");
const authRoutes = require("./routes/auth.route.js")
const verifyRoute = require("./routes/verify.auth.js")
const forgetRoute = require("./routes/forget.route.js")
const passwordRoute = require("./routes/password.route.js")
const profileRoute = require("./routes/profile.route.js")

app.use("/",authRoutes);
app.use("/",verifyRoute)
app.use("/",forgetRoute)
app.use("/",passwordRoute)
app.use("/",profileRoute)



app.listen(process.env.PORT, () => {
  console.log("Server Started...");
});
