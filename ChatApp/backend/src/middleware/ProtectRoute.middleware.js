import jwt from "jsonwebtoken";
import User from "../model/user.model..js";

export const ProtectRoute = async (req, res, next) => {
  try {
    const token = res.cookies.jwt;
    if (!token) {
      return res
        .status(400)
        .json({ message: "Unauthorized - No token Provided!" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res
        .status(400)
        .json({ message: "Unauthorized - Invalid token !" });
    }
  } catch (error) {}
};
