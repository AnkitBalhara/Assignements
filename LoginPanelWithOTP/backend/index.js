const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

app.post("/sendEmail", async (req, res) => {
  const { to, subject, text } = req.body; // Extract email details from the request body

  try {
    // Step 1: Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your-email@gmail.com", // Replace with your email
        pass: "your-app-password",   // Replace with your app password
      },
    });

    // Step 2: Define the email options
    const mailOptions = {
      from: "your-email@gmail.com",
      to, // Recipient email from the request
      subject, // Email subject from the request
      text, // Email body from the request
    };

    // Step 3: Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info.response);
    res.status(200).json({ message: "Email sent successfully", info: info.response });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
