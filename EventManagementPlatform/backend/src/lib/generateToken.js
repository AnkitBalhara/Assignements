import jwt from "jsonwebtoken";

export const generateToken = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    maxAge: 1 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });

  return token;
};
