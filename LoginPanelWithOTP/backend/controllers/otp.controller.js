const User = require("../models/Register.model");
const crypto = require("crypto"); // For generating a secure random OTP
const { sendEmail } = require("../Utils/sendEmail");

const handleRegenerateOTP = async (req, res) => {
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
  console.log("Otp regenerated")

  sendEmail(email, UserDeatils.name, otp);
};

const handleCanceOTP = async (req, res) => {
  const { email } = req.body;
  await User.deleteOne({ email });
};

module.exports = { handleRegenerateOTP, handleCanceOTP };
