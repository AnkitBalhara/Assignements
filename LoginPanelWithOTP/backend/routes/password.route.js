const express = require("express");
const User = require("../models/Register.model")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const {sendEmail} = require("../Utils/sendEmail");
const handleNewPassword = require("../controllers/password.controller");

const router = express.Router();

router.post("/new-password", handleNewPassword);

module.exports = router;
