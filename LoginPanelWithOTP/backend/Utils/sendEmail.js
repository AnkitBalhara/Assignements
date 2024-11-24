const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends an email with the specified details.
 * @param {string} email - Recipient's email address.
 * @param {string} name - Recipient's name.
 * @param {number} otp - One-Time Password to include in the email.
 */
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
        console.error("Error occurred:", error);
        throw new Error("Failed to send email");
      } else {
        console.log("Email sent successfully:", info.messageId);
      }
    }
  );
};

module.exports = {sendEmail,transporter};


// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });


// const sendEmail = (email, name, otp) => {
//   transporter.sendMail(
//     {
//       from: `Portal.Balhara <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Welcome to Balhara Portal! Verify Your Email Address",
//       html: `
// <p>
// Dear ${name},
// </p>
// <p>
// Thank you for signing up with Balhara Portal! We're thrilled to have you on board.
// </p>
// <p>
// To complete your registration, please use the One-Time Password (OTP) below to verify your email address:
// </p>
// <h2>${otp}</h2>
// <p>
// This OTP is valid for the next 10 minutes. If you didn't request this, please ignore this email.
// </p>
// <p>
// If you have any questions or need assistance, feel free to reach out to us at [support@example.com].
// </p>
// <p>
// Thank you for choosing Balhara Portal.
// </p>
// <p>
// Best regards,
// </p>
// <p>
// The Balhara Portal Team
// </p>
// `,
//     },
//     (error, info) => {
//       if (error) {
//         console.log("Error occurred:", error);
//         return res.status(500).json({ message: "Failed to send email" });
//       } else {
//         console.log("Email sent successfully:", info.messageId);
//       }
//     }
//   );
// };

// module.exports = sendEmail;