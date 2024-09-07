const express = require("express");
const router = express.Router();

const { handleAddStudents, getAllStudents } = require("../controllers/student");

router.get("/getAllStudents", getAllStudents);

router.post("/addStudent", handleAddStudents);

module.exports = router;
