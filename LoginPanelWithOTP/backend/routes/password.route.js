const express = require("express");
const User = require("../models/Register.model")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const {sendEmail} = require("../Utils/sendEmail")

const router = express.Router();

router.post("/regenerate-otp", async (req, res) => {
  const { email } = req.body;

  const UserDeatils = await User.findOne({ email });
  // console.log(UserDeatils);
  if (!UserDeatils) {
    return res
      .status(400)
      .json({ message: "No User found with this email address" });
  }
  const otp = crypto.randomInt(100000, 999999);
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  UserDeatils.otp = otp;
  UserDeatils.otpExpires = otpExpires;
  await UserDeatils.save();

  sendEmail(email, UserDeatils.name, otp);
});

router.post("/new-password", async (req, res) => {
  const { email, password } = req.body;

  try {
    const UserDetails = await User.findOne({ email });

    if (!UserDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    UserDetails.password = hashPassword;
    await UserDetails.save();

    res.status(200).json({ message: "Password Updated Successfully" });
  } catch (error) {
    console.error("Error in Password Update", error);
    res.status(500).json({ message: "Error in Password Update." });
  }
});

module.exports = router;
