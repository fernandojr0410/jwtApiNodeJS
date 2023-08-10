const mysql = require("mysql");

function connection() {
  const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Positivosim0410@",
    database: "atividade_api",
  });
  return conn;
}

module.exports = connection;
