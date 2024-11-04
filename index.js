const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
const sequelize = require("./dbConfig");

// Import your model
const Student = require("./models/student");
const UserSignUp = require("./models/user");

const PORT = 8080;
const studentRoute = require("./routes/student");
const employeesRoute = require("./routes/employee");
const userRoute = require("../node-practice-1/routes/user");

// Middlewares
app.use(express.json());

// Routes
app.use("/users", userRoute);
app.use("/students", studentRoute);
// app.use("/employees", employeesRoute);

app.get("/", (req, res) => {
  res.status(200).send("<h1>Hello from Node.Js</h1>");
});

// Sync the database schema and start the server
sequelize
  .sync() // You can also use .sync({ alter: true }) to update tables if the model structure changes
  .then(() => {
    console.log("Database synced successfully.");
    return sequelize.query("SELECT 1"); // Optional check to verify the connection
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
