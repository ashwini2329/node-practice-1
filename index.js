const express = require("express");
const app = express();

const db = require("./dbConfig");

const PORT = 8080;
const studentRoute = require("./routes/student");
const employeesRoute = require("./routes/employee");

//middlewares
app.use(express.json());

// student routes handler
app.use("/students", studentRoute);

// employees routes handler
app.use("/employees", employeesRoute);

app.get("/", (req, res) => {
  res.status(200).send("<h1>Hello from Node.Js</h1>");
});

db.query("Select 1")
  .then(() => {
    console.log("connected to database");
    app.listen(PORT, () => {
      console.log(`server connected at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error connecting to database - ${err}`);
  });
