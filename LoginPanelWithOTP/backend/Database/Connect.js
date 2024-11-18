const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Connection = mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connection Made successfully");
  })
  .catch((error) => {
    console.log("Error occured in connection...");
  });

module.exports = Connection;
