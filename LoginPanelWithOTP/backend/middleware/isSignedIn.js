const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");


const isSignedIn = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({ message: "Not Authorized" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.userdata = data;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = isSignedIn;