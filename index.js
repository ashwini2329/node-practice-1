const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

const sequelize = require("./dbConfig");

const PORT = 8080;
const studentRoute = require("./routes/student");
const employeesRoute = require("./routes/employee");
const userRoute = require("../node-practice-1/routes/user");

//middlewares
app.use(express.json());

// app.use("/user", userRoute);

// student routes handler
app.use("/students", studentRoute);

// employees routes handler
// app.use("/employees", employeesRoute);

app.get("/", (req, res) => {
  res.status(200).send("<h1>Hello from Node.Js</h1>");
});

sequelize.query("Select 1")
  .then(() => {
    console.log("connected to database");
    app.listen(PORT, () => {
      console.log(`server connected at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error connecting to database - ${err}`);
  });
