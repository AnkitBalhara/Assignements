import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const ProtectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// import jwt from "jsonwebtoken";
// import User from "../model/user.model.js";

// export const ProtectRoute = async (req, res, next) => {
//   try {
//     const token = res.cookies.jwt;
//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "Unauthorized - No token Provided!" });
//     }

//     const decode = jwt.verify(token, process.env.JWT_SECRET);
//     if (!decode) {
//       return res
//         .status(401)
//         .json({ message: "Unauthorized - Invalid token !" });
//     }

//     const user = await User.findById(decode.userId).select("-password");

//     if(!user){
//       return res.status(401).json({message:"User not found"})
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.log("Error in protected route Middleware :-",error)
//     res.status(500).json({message:"Internal server error"})
//   }
// };
