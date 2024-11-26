import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  let token = jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    maxAge: 1 * 24 * 60 * 60 * 1000, //MS
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV != "development",
  });
};
