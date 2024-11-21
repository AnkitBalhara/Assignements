const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const crypto = require("crypto"); // For generating a secure random OTP
const bcrypt = require("bcryptjs");
const app = express();
const Connect = require("./Database/Connect");
const User = require("./models/Register.model");

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = (email, name, otp) => {
  transporter.sendMail(
    {
      from: `Portal.Balhara <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Balhara Portal! Verify Your Email Address",
      html: `
<p>
Dear ${name},
</p>
<p>
Thank you for signing up with Balhara Portal! We're thrilled to have you on board.
</p>
<p>
To complete your registration, please use the One-Time Password (OTP) below to verify your email address:
</p>
<h2>${otp}</h2>
<p>
This OTP is valid for the next 10 minutes. If you didn't request this, please ignore this email.
</p>
<p>
If you have any questions or need assistance, feel free to reach out to us at [support@example.com].
</p>
<p>
Thank you for choosing Balhara Portal.
</p>
<p>
Best regards,
</p>
<p>
The Balhara Portal Team
</p>
`,
    },
    (error, info) => {
      if (error) {
        console.log("Error occurred:", error);
        return res.status(500).json({ message: "Failed to send email" });
      } else {
        console.log("Email sent successfully:", info.messageId);
      }
    }
  );
};

app.post("/register", async (req, res) => {
  const { email, name, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  console.log(hashPassword);
  try {
    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999);

    // Save user details along with the OTP
    const userCreated = await User.create({
      name,
      email,
      password: hashPassword,
      otp,
    });

    // Send the OTP email
    sendEmail(email, userCreated.name, otp);

    res.status(201).json({
      message: "User registered successfully. OTP has been sent to your email.",
    });
  } catch (err) {
    console.error("Error during user registration:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  const UserDetails = await User.findOne({ email });
  if (otp == UserDetails.otp) {
    console.log("OTP Matched");
    res.status(200);
  } else {
    console.log("OTP Mismatched...");
    res.status(400);
  }
  res.end();
});

app.post("/regenerate-otp", async (req, res) => {
  const { email } = req.body;

  const UserDeatils = await User.findOne({ email });
  console.log(UserDeatils);
  const otp = crypto.randomInt(100000, 999999);

  UserDeatils.otp = otp;
  await UserDeatils.save();

  sendEmail(email, UserDeatils.name, otp);
});

app.post("/cancel-otp", async (req, res) => {
  const { email } = req.body;
  await User.deleteOne({ email });
  console.log("User Deleted Successfully.");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const UserDetails = await User.findOne({ email });
  bcrypt.compare(password, UserDetails.password, (error, result) => {
    if (!result) {
      console.log("Wrong Password");
      res.status(400).json({ message: "Wrong Password" });
    } else {
      console.log("Success Password");
      res.status(200).json({ message: "Password Match" });
    }
  });
});

app.post("/forget-password-otp", async (req, res) => {
  const { email } = req.body;

  const UserDetails = await User.findOne({ email });
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
  console.log("Suucess full request for Forget Password OTP")
});

app.listen(process.env.PORT, () => {
  console.log("Server Started...");
});
