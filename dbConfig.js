const mySql = require("mysql2/promise");

const mySqlPool = mySql.createPool({
  host: "localhost",
  user: "root",
  password: "CodeHunter_023@",
  database: "node_practice_1",
});

module.exports = mySqlPool;
