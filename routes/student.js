const express = require("express");
const router = express.Router();

const {
  handleAddStudents,
  getAllStudents,
  handleDeleteUserByRollNo,
  handleUpdateStudentById,
} = require("../controllers/student");

router.get("/getAllStudents", getAllStudents);

router.post("/addStudent", handleAddStudents);

router.delete("/deleteStudent/:id", handleDeleteUserByRollNo);

router.patch("/updateStudent/:id", handleUpdateStudentById);

module.exports = router;
