const express = require("express");
const router = express.Router();

const {
  handleAddStudents,
  getAllStudents,
  handleDeleteUserByRollNo,
} = require("../controllers/student");

router.get("/getAllStudents", getAllStudents);

router.post("/addStudent", handleAddStudents);

router.delete("/deleteStudent/:id", handleDeleteUserByRollNo);

module.exports = router;
