const db = require("../dbConfig");

const handleAddStudents = async (req, res) => {
  try {
    const { roll_no, name, classCurrent, fees, age, address } = req.body;
    if (!roll_no || !name || !classCurrent || !fees || !age || !address) {
      console.log(`All data are required to add a student`);
      res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const data = await db.query(
      `INSERT INTO student (roll_no, name, classCurrent, fees, age, address) VALUES(?, ?, ?, ?, ? ,?)`,
      [roll_no, name, classCurrent, fees, age, address]
    );
    if (!data) {
      console.log(`Failed to add student`);
      res.status(404).send({
        success: false,
        message: "Failed to add student",
      });
    }
    res.status(201).send({
      success: true,
      message: "Student added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error adding student",
      error: error,
    });
  }
};

module.exports = { handleAddStudents };
