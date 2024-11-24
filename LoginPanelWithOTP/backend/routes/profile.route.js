const express = require("express");
const isSignedIn = require("../middleware/isSignedIn")
const User = require("../models/Register.model")

const router = express.Router();


router.get("/profile/fetch-data", isSignedIn, async (req, res) => {
    const UserDetails = await User.findOne({ email: req.userdata.email });
    if (!UserDetails) {
      return res.status(400).json({ message: "No user Found" });
    }
    // console.log(req.userdata);
    res
      .status(200)
      .json({ message: "User Data detched successfully", user: UserDetails });
  });

module.exports = router;