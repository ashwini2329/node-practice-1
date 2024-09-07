const db = require("../dbConfig");

const getAllEmployees = async (req, res) => {
  try {
    const data = await db.query(`SELECT * FROM employees`);
    if (!data) {
      res.status(404).send({
        success: false,
        message: "No employees found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Employees data fetched successfully",
      totalEmployees: data[0].length,
      employees: data[0],
    });
  } catch (error) {
    console.log(`Error fetching employees data - ${error}`);
    res.status(500).send({
      success: false,
      message: "Error fetching employees data",
      error: error,
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send({
        success: false,
        message: "Employee Id is required !",
      });
    }
    const data = await db.query(`SELECT * FROM employees WHERE emp_Id = ?`, [
      id,
    ]);
    if (data.affectedRows === 0) {
      res.status(404).send({
        success: false,
        message: `Employee not found with given Id`,
      });
    }
    res.status(200).send({
      success: true,
      message: "Employee data fetched successfully",
      employeeData: data[0],
    });
  } catch (error) {
    console.log(`error fetching employee using given id`);
    res.status(500).send({
      success: false,
      message: `error fetching employee using given id`,
      error: error,
    });
  }
};

const handleAddEmployee = async (req, res) => {
  try {
    const {
      emp_Id,
      emp_name,
      salary,
      client_name,
      office_location,
      permanent,
    } = req.body;
    if (
      !emp_Id ||
      !emp_name ||
      !salary ||
      !client_name ||
      !office_location ||
      !permanent
    ) {
      console.log("All field are required to add an Employee");
      res.status(400).send({
        success: false,
        message: "All field are required to add an Employee",
      });
    }
    const data = await db.query(
      `INSERT INTO employees(emp_Id,
      emp_name,
      salary,
      client_name,
      office_location,
      permanent) VALUES(?, ?, ?, ?, ?, ?)`,
      [emp_Id, emp_name, salary, client_name, office_location, permanent]
    );
    if (!data.affectedRows === 0) {
      res.status(404).send({
        success: false,
        message: "Error adding employee",
      });
    }
    res.status(201).send({
      success: true,
      message: "Employee added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error adding employee",
      error: error.message,
    });
  }
};

module.exports = { handleAddEmployee, getAllEmployees, getEmployeeById };
