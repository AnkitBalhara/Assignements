const express = require("express");
const { handleVerifyOTP } = require("../controllers/verifyuser.controller");


const router  = express.Router();


router.post("/verify-otp", handleVerifyOTP);

  module.exports = router;