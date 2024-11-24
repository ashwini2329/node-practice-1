const Sequelize = require("sequelize");
const sequelize = require("../dbConfig");

const Student = sequelize.define("student", {
  roll_no: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  classCurrent: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fees: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdBy: {
    type: Sequelize.INTEGER, // or STRING, depending on the data type of userId
    allowNull: false,
  },
});
module.exports = Student;
