const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token =
    req.header("Authorization") && req.header("Authorization").split(" ")[1];
  console.log(`token = ${token}`);
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    console.log(`decoded = ${JSON.stringify(decoded)}`);
    req.user = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = { verifyToken };
