const Sequelize = require("sequelize");
const sequelize = require("../dbConfig");

const UserSignUp = sequelize.define("userSignUp", {
  userId: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    primaryKey: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = UserSignUp;
