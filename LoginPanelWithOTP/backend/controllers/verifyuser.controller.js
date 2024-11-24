const User = require("../models/Register.model");

const handleVerifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const UserDetails = await User.findOne({ email });

  if (!UserDetails) {
    return res.status(400).json({ message: "No User Exists!!!" });
  }

  if (Date.now() > UserDetails.otpExpires) {
    return res
      .status(400)
      .json({ message: "OTP has expired. Please regenerate." });
  }

  if (otp == UserDetails.otp) {
    console.log("OTP Matched");
    res.status(200).json({ message: "OTP Verified Successfully." });
  } else {
    console.log("OTP Mismatched...");
    res.status(400).json({ message: "OTP doesn't match." });
  }
};

module.exports = {handleVerifyOTP}