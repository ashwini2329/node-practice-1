const express = require("express");
const router = express.Router();

const {
  handleAddStudents,
  getAllStudents,
  getStudentByRollNo,
  handleDeleteUserByRollNo,
  handleUpdateStudentById,
  replaceStudentById,
} = require("../controllers/student");

router.get("/getAllStudents", getAllStudents);

router.get("/getStudentById/:roll_no", getStudentByRollNo);

router.post("/addStudent", handleAddStudents);

router.delete("/deleteStudent/:roll_no", handleDeleteUserByRollNo);

router
  .route("/updateStudent/:roll_no")
  .patch(handleUpdateStudentById)
  .put(replaceStudentById);

module.exports = router;
