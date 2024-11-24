const express = require("express");

const authRoutes = require("./auth.route.js");
const verifyRoute = require("./verify.auth.js");
const forgetRoute = require("./forget.route.js");
const passwordRoute = require("./password.route.js");
const profileRoute = require("./profile.route.js");
const otpRoute = require("./otp.route.js");

const router = express.Router();

router.use("/", authRoutes);
router.use("/", verifyRoute);
router.use("/", forgetRoute);
router.use("/", passwordRoute);
router.use("/", profileRoute);
router.use("/",otpRoute)

module.exports = router;
