import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters" });
    }

    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
      return res.status(400).json({ message: "User Already Exists!!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const UserCreated = await User.create({
      fullName,
      email,
      password: hashPassword,
    });

    if (UserCreated) {
      generateToken(UserCreated._id, res);
    }

    res.status(200).json({ message: "User Created Successfully" });
  } catch (error) {
    console.log("Error in User creation:-", error);
    res.status(400).json({ message: "Error in signup" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const UserDetails = await User.findOne({ email });
    if (!UserDetails) {
      return res.status(400).json({ message: "Invalid Credentials " });
    }

    const passwordCheck = await bcrypt.compare(password, UserDetails.password);
    if (!passwordCheck) {
      return res.status(400).json({ message: "Invalid Credintials" });
    }

    generateToken(UserDetails._id, res);

    res.status(200).json({
      _id: UserDetails._id,
      fullName: UserDetails.fullName,
      email: UserDetails.email,
    });
  } catch (error) {
    console.log("Error in Login", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "lax", path: "/" });
    res.status(200).json({ message: "Logout" });
  } catch (error) {
    console.log("Eror in Logout",error);
    res.status(500).json({message:"Internal Server Error"})
  }
};
