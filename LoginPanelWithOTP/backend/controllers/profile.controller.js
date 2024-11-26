const User = require("../models/Register.model");

const handleProfilePage = async (req, res) => {
  const UserDetails = await User.findOne({ email: req.userdata.email }).select("-password");
  if (!UserDetails) {
    return res.status(400).json({ message: "No user Found" });
  }
  res
    .status(200)
    .json({ message: "User Data detched successfully", user: UserDetails });
};

module.exports = { handleProfilePage };
