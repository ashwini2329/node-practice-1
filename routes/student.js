const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyJwtToken");

const {
  handleAddStudents,
  getAllStudents,
  getStudentByRollNo,
  handleDeleteUserByRollNo,
  handleUpdateStudentById,
  replaceStudentById,
} = require("../controllers/student");

router.get("/getAllStudents", verifyToken, getAllStudents);

router.get("/getStudentById/:roll_no", verifyToken, getStudentByRollNo);

router.post("/addStudent", verifyToken, handleAddStudents);

router.delete("/deleteStudent/", verifyToken, handleDeleteUserByRollNo);

router
  .route("/updateStudent/:roll_no")
  .patch(handleUpdateStudentById)
  .put(replaceStudentById);

module.exports = router;
