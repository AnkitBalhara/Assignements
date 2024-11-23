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
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Middleware...
const isSignedIn = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({ message: "Not Authorized" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET); 
    req.userdata = data; 
    next(); 
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};


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
  // console.log(hashPassword);
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
    res.status(500).json({ message: "Already have Account with this Email" });
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
  if (!UserDetails) {
    return res.status(400).json({ message: "Email Doesn't Exists" });
  }

  bcrypt.compare(password, UserDetails.password, (error, result) => {
    if (!result) {
      console.log("Wrong Password");
      res.status(400).json({ message: "Wrong Password" });
    } else {
      console.log("Success Password");
      let token = jwt.sign(
        { email: email, userId: UserDetails._id },
        process.env.JWT_SECRET
      );
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      });
      // console.log("Cookies  Set")
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
  console.log("Suucess full request for Forget Password OTP");
});

app.post("/forget-password-otp-match", async (req, res) => {
  const { email, otp } = req.body;

  const UserDetails = await User.findOne({ email });
  try {
    if (otp == UserDetails.otp) {
      res.status(200).json({ message: "OTP Matched" });
    }
  } catch (error) {
    res.status(400).json({ message: "OTP Doesn't match." });
    console.log("Otp Mismatch");
  }
});

app.post("/new-password", async (req, res) => {
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
});

app.get("/profile/fetch-data", isSignedIn, async (req, res) => {
  const UserDetails = await User.findOne({email:req.userdata.email});
  // console.log(req.userdata);
  res.status(200).json({ message: "Okay" ,user:UserDetails});
});

app.get("/logout", isSignedIn, async (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "lax", path: "/" });
  console.log("Logot Successfully");
  res.status(200).json({ message: "Cookies Cleared" });
});

app.listen(process.env.PORT, () => {
  console.log("Server Started...");
});
