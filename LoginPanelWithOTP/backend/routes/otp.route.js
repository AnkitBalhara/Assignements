const express = require("express");
const {
  handleRegenerateOTP,
  handleCanceOTP,
} = require("../controllers/otp.controller");

const router = express.Router();

router.post("/regenerate-otp", handleRegenerateOTP);

router.post("/cancel-otp", handleCanceOTP);


// router.post("/regenerate-otp", async (req, res) => {
//   const { email } = req.body;

//   const UserDeatils = await User.findOne({ email });
//   // console.log(UserDeatils);
//   if (!UserDeatils) {
//     return res
//       .status(400)
//       .json({ message: "No User found with this email address" });
//   }
//   const otp = crypto.randomInt(100000, 999999);
//   const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

//   UserDeatils.otp = otp;
//   UserDeatils.otpExpires = otpExpires;
//   await UserDeatils.save();

//   sendEmail(email, UserDeatils.name, otp);
// });

module.exports = router;
