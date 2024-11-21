const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const crypto = require("crypto"); // For generating a secure random OTP
dotenv.config();
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

app.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  try {
    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999);

    // Save user details along with the OTP
    const userCreated = await User.create({ name, email, password, otp });

    // Send the OTP email
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

    res.status(201).json({
      message: "User registered successfully. OTP has been sent to your email.",
    });
  } catch (err) {
    console.error("Error during user registration:", err);
    res.status(500).json({ message: "Internal server error" });
  }

  // console.log("User Created Successfully.")
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
console.log(UserDeatils)
  const otp = crypto.randomInt(100000, 999999);

  UserDeatils.otp = otp;
  await UserDeatils.save();

  transporter.sendMail(
    {
      from: `Portal.Balhara <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Balhara Portal! Verify Your Email Address",
      html: `
<p>
Dear ${UserDeatils.name},
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
});

app.post("/cancel-otp",async (req,res)=>{
  const {email} = req.body;
console.log(email)
  const UserDetails = await User.deleteOne({email});
  console.log(UserDetails)
  console.log("User Deleted Successfully.")
})

app.listen(process.env.PORT, () => {
  console.log("Server Started...");
});
