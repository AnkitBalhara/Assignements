const User = require("../models/Register.model")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const {sendEmail} = require("../Utils/sendEmail")

const handleNewPassword=async (req, res) => {
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
  }

  module.exports = handleNewPassword;