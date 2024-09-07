const express = require("express");
const router = express.Router();

const {
  handleAddStudents,
  getAllStudents,
  handleDeleteUserByRollNo,
  handleUpdateStudentById,
  replaceStudentById,
} = require("../controllers/student");

router.get("/getAllStudents", getAllStudents);

router.post("/addStudent", handleAddStudents);

router.delete("/deleteStudent/:id", handleDeleteUserByRollNo);

router
  .route("/updateStudent/:id")
  .patch(handleUpdateStudentById)
  .put(replaceStudentById);

module.exports = router;
