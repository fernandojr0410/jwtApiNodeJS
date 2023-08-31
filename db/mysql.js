const mysql = require("mysql");

function connection() {
  const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "atividade_api",
  });
  return conn;
}

module.exports = connection;
