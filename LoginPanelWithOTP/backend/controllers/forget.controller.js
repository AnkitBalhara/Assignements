const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/Register.model");
const crypto = require("crypto"); // For generating a secure random OTP
const { sendEmail, transporter } = require("../Utils/sendEmail.js");

const handleForgetPasswordOtp = async (req, res) => {
  const { email } = req.body;

  const UserDetails = await User.findOne({ email });
  if (!UserDetails) {
    return res
      .status(400)
      .json({ message: "No user Exists with this emial Address" });
  }
  const otp = crypto.randomInt(100000, 999999);

  transporter.sendMail(
    {
      from: `Portal.Balhara <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Balhara Portal! Verify Your Email Address",
      html: `<h3> Verification Code</h3>
        
        <p> This is a mail generated from Balhara Portal that you Forget your Balhara Portal Password.</p>
  
        <h3>For that OTP to verify your account ${otp}
        </h3>
        `,
    },
    (error, info) => {
      if (error) {
        console.log("Error occurred:", error);
        return res.status(500).json({ message: "Failed to send email" });
      } else {
        res.status(200).json({ message: "Email send Successfully" });
      }
    }
  );

  UserDetails.otp = otp;
  await UserDetails.save();
  // console.log("Success full request for Forget Password OTP");
};

const handleForgetPasswordOtpMatch = async (req, res) => {
  const { email, otp } = req.body;

  const UserDetails = await User.findOne({ email });
  try {
    if (otp == UserDetails.otp) {
      res.status(200).json({ message: "OTP Matched" });
    } else {
      return res.status(400).json({ message: "Invalid or Expired OTP" });
    }
  } catch (error) {
    res.status(400).json({ message: "OTP Doesn't match." });
    console.log("Otp Mismatch");
  }
};

module.exports = { handleForgetPasswordOtp, handleForgetPasswordOtpMatch };
