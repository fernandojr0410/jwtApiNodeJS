const conn = require("../db/mysql.js");
const util = require("util");
const queryPromise = util.promisify(conn().query).bind(conn());

function findAll() {
  return queryPromise("SELECT * FROM funcionario");
}

function findById(id) {
  return queryPromise(`SELECT * FROM funcionario WHERE id_funcionario = ${id}`);
}

function insert(dados) {
  const { nome, cpf, ativo } = dados;

  let sql = `INSERT INTO funcionario (nome, cpf, ativo) values ('${nome}', '${cpf}', ${
    ativo ? 1 : 0
  })`;
  return queryPromise(sql);
}

function update(dados) {
  const { idFuncionario, nome, cpf, ativo } = dados;
  const params = [];
  let sql = "UPDATE funcionario SET ";

  if (nome) {
    sql += "nome = ?, ";
    params.push(nome);
  }

  if (cpf) {
    sql += "cpf = ?, ";
    params.push(cpf);
  }

  if (ativo) {
    sql += "ativo = ?, ";
    params.push(ativo);
  }

  sql = sql.slice(0, -2);

  sql += " WHERE id_funcionario = ?";
  params.push(idFuncionario);

  console.log("SQL:", sql);
  console.log("Params:", params);

  return queryPromise(sql, params);
}

function deleteById(id) {
  return queryPromise(
    `DELETE FROM funcionario WHERE id_funcionario IN (${id})`
  );
}

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteById,
};
