import { generateToken } from "../lib/generateToken.js";
import bcrypt from "bcryptjs";
import UserModel from "../models/user.model.js";

export const signup = async (req, res) => {
  const { email, password, fullName } = req.body;

  try {
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be of 6 characters" });
    }
    const AlreadyUser = await UserModel.findOne({ email });
    if (AlreadyUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ fullName, email, password: hashPassword });

    if (newUser) {
      // generate jwt token
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error in SignUp", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
