const express = require("express");
const router = express.Router();

const { handleAddStudents } = require("../controllers/student");

router.post("/addStudent", handleAddStudents);

module.exports = router;
