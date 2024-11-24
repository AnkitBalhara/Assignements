const express = require("express");
const isSignedIn = require("../middleware/isSignedIn");
const { handleProfilePage } = require("../controllers/profile.controller");

const router = express.Router();


router.get("/profile/fetch-data", isSignedIn, handleProfilePage);

module.exports = router;