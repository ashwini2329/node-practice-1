const bcrypt = require("bcryptjs");
const db = require("../dbConfig");
const UserSignUp = require("../models/user");

const handleUserSignup = async (req, res) => {
  const { userId, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  console.log(
    `password - ${password} and hashed passwd is - ${hashedPassword}`
  );
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

module.exports = { handleUserSignup };
