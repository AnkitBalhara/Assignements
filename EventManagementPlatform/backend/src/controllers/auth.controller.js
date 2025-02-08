import { generateToken } from "../lib/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  // res.send("Jai Shree Ram")

  const { fullName, email, password } = req.body;

  try {
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be of 6 characters" });
    }

    const AlreadyUser = await User.findOne({ email });

    if (AlreadyUser)
      return res.status(400).json({ message: "User already exists" });

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ fullName, email, password: hashPassword });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      return res.status(201).json({ message: "User successfully created" });
    } else {
      return res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error occurred in SignUp :-", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDetails = await User.findOne({ email });

    if (!userDetails) {
      return res.status(400).json({ message: "Invalid Credintials !!!" });
    }

    const passwordMatch = await bcrypt.compare(password, userDetails.password);

    if (passwordMatch) {
      generateToken(userDetails._id, res);
      res.status(201).json({
        _id: userDetails._id,
        fullName: userDetails.fullName,
        email: userDetails.email,
      });
    } else {
      return res.status(400).json({ message: "Invalid Password" });
    }
  } catch (error) {
    console.log("Error in login :-", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true, sameSite: "lax" });
    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    console.log("Error in Logout Controller:-", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
