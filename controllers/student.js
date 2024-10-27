const db = require("../dbConfig");
const Student = require("../models/student");

// GET Request - Get all data from the student table
const getAllStudents = async (req, res) => {
  Student.findAll()
    .then((students) => {
      res.status(201).json({
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
const handleDeleteUserByRollNo = async (req, res) => {
  try {
    console.log(req.params);
    const id = req.params.id;
    if (!id) {
      console.log("id is required to delete a user");
      res.status(400).send({
        success: false,
        message: "Please provide id to delete the user",
      });
    }
    const [data] = await db.query(`DELETE FROM student WHERE roll_no = ?`, [
      id,
    ]);
    if (data.affectedRows === 0) {
      console.log("User not found or already deleted");
      return res.status(404).send({
        success: false,
        message: "User not found or already deleted",
      });
    }
    res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: false,
      message: "Error deleting user",
      error: error,
    });
  }
};

// PATCH Request - Updating student By Id
const handleUpdateStudentById = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, fees, age, address } = req.body;
    if (!id) {
      res.status(400).send({
        success: false,
        message: "Please provide id to update the student",
      });
    }
    const data = await db.query(
      `UPDATE student SET name = ?,fees = ?,age = ?, address = ? WHERE roll_no = ?`,
      [name, fees, age, address, id]
    );
    if (!data) {
      res.status(404).send({
        success: false,
        message: `Errro updating the user with ${id}`,
      });
    }
    res.status(200).send({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    console.log(`Error Updating student - ${error}`);
    res.status(500).send({
      success: false,
      message: "Error updating student",
      error: error,
    });
  }
};

// PUT Request - Updating student By Id
const replaceStudentById = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, classCurrent, fees, age, address } = req.body;
    if (!name || !classCurrent || !fees || !age || !address) {
      res.status(400).send({
        success: false,
        message: "All fields are required to update the data",
      });
    }
    const data = await db.query(
      `UPDATE student SET name = ?, classCurrent = ?, fees = ?, age = ?, address = ? WHERE roll_no = ?`,
      [name, classCurrent, fees, age, address, id]
    );
    if (!data) {
      res.status(404).send({
        message: false,
        message: `Error replacing the user with ${id}`,
      });
    }
    res.status(200).send({
      success: true,
      message: "User replaced successfully",
    });
  } catch (error) {
    console.log(`Error replacing student - ${error}`);
    res.status(500).send({
      success: false,
      message: "Error replacing student",
      error: error,
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
