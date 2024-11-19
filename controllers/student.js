const db = require("../dbConfig");
const Student = require("../models/student");

// GET Request - Get all data from the student table
const getAllStudents = async (req, res) => {
  Student.findAll()
    .then((students) => {
      return res.status(201).json({
        success: true,
        data: students,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Error fetching students",
        error: error.message,
      });
    });
};

// GET Studeny by Roll No
const getStudentByRollNo = async (req, res) => {
  const roll_no = req.params.roll_no;
  Student.findByPk(roll_no)
    .then((student) => {
      if (student) {
        res.status(201).json({
          success: true,
          data: student,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Student not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Error fetching student",
        error: error.message,
      });
    });
};

// POST Request - Adding student into student table
const handleAddStudents = async (req, res) => {
  const { roll_no, name, classCurrent, fees, age, address } = req.body;
  if (!roll_no || !name || !classCurrent || !fees || !age || !address) {
    return res.status(422).json({
      success: false,
      error: "All fields are required to create a student",
    });
  }
  Student.create({
    roll_no,
    name,
    classCurrent,
    fees,
    age,
    address,
  })
    .then((student) => {
      res.status(201).json({
        success: true,
        data: student,
        message: "Student created successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Error creating student",
        error: error.message,
      });
    });
};

// DELETE Request - Deleting student by Id from student table
const handleDeleteUserByRollNo = (req, res) => {
  const roll_no = req.body.roll_no;
  if (!roll_no) {
    return res.status(422).json({
      success: false,
      message: "Roll number is required",
    });
  }
  Student.destroy({ where: { roll_no: roll_no } })
    .then((deleted) => {
      if (deleted) {
        res.status(200).json({
          success: true,
          message: "Student deleted successfully",
          data: deleted,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Student not found",
          data: deleted,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Error deleting student",
        error: error.message,
      });
    });
};

// PATCH Request - Updating student By Id
const handleUpdateStudentById = async (req, res) => {
  const roll_no = req.params.roll_no;
  const { name, fees, address } = req.body;
  try {
    Student.update(
      { name, fees, address },
      { where: { roll_no: roll_no } }
    ).then((updated) => {
      if (updated) {
        res.status(200).json({
          success: true,
          message: "Student updated successfully",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Student not found",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating student",
      error: error.message,
    });
  }
};

// PUT Request - Updating student By Id
const replaceStudentById = async (req, res) => {
  const roll_no = req.params.roll_no;
  const { name, classCurrent, fees, age, address } = req.body;
  try {
    Student.update(
      { name, classCurrent, fees, age, address },
      { where: { roll_no: roll_no } }
    ).then((updated) => {
      if (updated) {
        res.status(200).json({
          success: true,
          message: "Student updated successfully",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Student not found",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating student",
      error: error.message,
    });
  }
};

module.exports = {
  getAllStudents,
  getStudentByRollNo,
  handleAddStudents,
  handleDeleteUserByRollNo,
  handleUpdateStudentById,
  replaceStudentById,
};
