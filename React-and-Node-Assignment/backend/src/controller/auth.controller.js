import UserModel from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../Utils/generateToken.js";

export const signup = async (req, res) => {
  const { fullName, password, email } = req.body;

  try {
    if (!fullName || !password || !email) {
      return res.status(400).json({ message: "All Fields are Required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be of 6 characters" });
    }

    const AlreadyUser = await UserModel.findOne({ email });

    if (AlreadyUser) {
      return res.status(400).json({ message: "Email Already Exists" });
    }

    const hashPassword =await bcrypt.hash(password, 10);
    // console.log(hashPassword);

    const newUser = new UserModel({ fullName, email, password: hashPassword });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(200).json({ message: "User Registered Successfully!!" });
    } else {
      return res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error Occurred in SignUp :-", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
