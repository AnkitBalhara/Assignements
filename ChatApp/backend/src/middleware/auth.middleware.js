import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized -No token provided" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    const user = await UserModel.findById(decode.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "No User Found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in Protected Middleware", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
