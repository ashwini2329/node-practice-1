const express = require("express");
const router = express.Router();

const {
  handleAddEmployee,
  getAllEmployees,
  getEmployeeById,
} = require("../controllers/employee");

router.get("/", getAllEmployees);

router.get("/:id", getEmployeeById);

router.post("/addEmployee", handleAddEmployee);

module.exports = router;
