const express = require("express");
const {
  handleForgetPasswordOtp,
  handleForgetPasswordOtpMatch,
} = require("../controllers/forget.controller.js");

const router = express.Router();

router.post("/forget-password-otp", handleForgetPasswordOtp);

router.post("/forget-password-otp-match", handleForgetPasswordOtpMatch);

module.exports = router;
