const express = require("express");
const isSignedIn = require("../middleware/isSignedIn.js");

const router = express.Router();

const {
  handleRegisterUser,
  handleLoginUser,
  handleLogoutUser,
} = require("../controllers/auth.controller.js");

router.post("/register", handleRegisterUser);

router.post("/login", handleLoginUser);
router.get("/logout", isSignedIn, handleLogoutUser);
module.exports = router;
