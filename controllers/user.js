const bcrypt = require("bcryptjs/dist/bcrypt");
const db = require("../dbConfig");

const handleUserSignup = async (req, res) => {
  try {
    const { userName, email, passwd } = req.body;
    if (!userName || !email || !password) {
      res.status(400).send({
        success: false,
        message: "All fields are required to signup user",
      });
    }
    const hashedPassword = await bcrypt.hash(passwd, 12);
    console.log(
      `password - ${passwd} and hashed passwd is - ${hashedPassword}`
    );
    const data = await db.query(
      `INSERT INTO user (userName, email, passwd) VALUES(?, ?, ?)`,
      [userName, email, hashedPassword]
    );
    if (!data) {
      res.status(404).send({
        success: false,
        message: "User already exists",
      });
    }
    res.status(201).send({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error signing up user",
      error: error,
    });
  }
};

module.exports = { handleUserSignup };
