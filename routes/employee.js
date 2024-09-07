const express = require("express");
const router = express.Router();

const {
  handleAddEmployee,
  getAllEmployees,
} = require("../controllers/employee");

router.get("/", getAllEmployees);

router.post("/addEmployee", handleAddEmployee);

module.exports = router;
