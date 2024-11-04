const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const db = require("../dbConfig");
const { UserSignUp, UserSignIn } = require("../models/user");

const handleUserSignup = async (req, res) => {
  const { userId, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  UserSignUp.create({
    userId,
    email,
    password: hashedPassword,
  })
    .then((signup) => {
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: signup,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        message: "Error creating user",
        error: error.message,
      });
    });
};

const handleUserSignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserSignUp.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const doMatch = await bcrypt.compare(password, user.password);
    if (doMatch) {
      const token = jwt.sign({ userId: user.id }, jwtSecret, {
        expiresIn: "1h",
      });
      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token: token,
        data: user,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = { handleUserSignup, handleUserSignIn };
