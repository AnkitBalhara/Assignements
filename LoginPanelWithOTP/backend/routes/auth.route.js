const express = require("express");

const User = require("../models/Register.model")
const bcrypt = require("bcryptjs");
const crypto = require("crypto"); // For generating a secure random OTP
const jwt = require("jsonwebtoken");
const isSignedIn = require("../middleware/isSignedIn.js")
const { sendEmail, transporter } = require("../Utils/sendEmail.js");
const dotenv = require("dotenv");
dotenv.config();




const router  = express.Router();

router.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  const alreadyUser = await User.findOne({ email });
  if (alreadyUser)
    return res
      .status(500)
      .json({ message: "Already have an account with this Email" });

  const hashPassword = await bcrypt.hash(password, 10);
  try {
    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999);

    // Save user details along with the OTP
    const userCreated = await User.create({
      name,
      email,
      password: hashPassword,
      otp,
      otpExpires,
    });

    // Send the OTP email
    sendEmail(email, userCreated.name, otp);

    res.status(201).json({
      message: "User registered successfully. OTP has been sent to your email.",
    });
  } catch (err) {
    console.error("Error during user registration:", err);
   return res.status(500).json({ message: "Error during user registration" });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const UserDetails = await User.findOne({ email });
  if (!UserDetails) {
    return res.status(400).json({ message: "Email Doesn't Exists" });
  }

  bcrypt.compare(password, UserDetails.password, (error, result) => {
    if (!result) {
      // console.log("Wrong Password");
      res.status(400).json({ message: "Wrong Password" });
    } else {
      // console.log("Success Password");
      let token = jwt.sign(
        { email: email, userId: UserDetails._id },
        process.env.JWT_SECRET
      );
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      });
      // console.log("Cookies  Set")
      res.status(200).json({ message: "Password Match" });
    }
  });
});

router.get("/logout", isSignedIn, async (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "lax", path: "/" });
  console.log("Logot Successfully");
  res.status(200).json({ message: "Cookies Cleared" });
});

module.exports = router;