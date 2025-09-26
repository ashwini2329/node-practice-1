const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./dbConfig");
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

const Student = require("./models/student");
const UserSignUp = require("./models/user");
const studentRoute = require("./routes/student");
const employeesRoute = require("./routes/employee");
const userRoute = require("./routes/user");

app.use("/users", userRoute);
app.use("/students", studentRoute);
// app.use("/employees", employeesRoute);

app.get("/", (req, res) => {
  res.status(200).send("<h1>Hello from Node.Js</h1>");
});

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced successfully.");
    return sequelize.query("SELECT 1");
  })
  .then(() => {
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error connecting to database - ${err}`);
  });
