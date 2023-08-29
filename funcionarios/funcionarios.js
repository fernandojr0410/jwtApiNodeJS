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
  let sql = `INSERT INTO funcionario (nome, cpf, ativo) values ('${nome}', '${cpf}', '${ativo}')`;
  return queryPromise(sql);
}

function update(dados) {
  const { id, nome, cpf, ativo } = dados;
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
  params.push(id);

  return queryPromise(sql, params);
}

function deleteById(ids) {
  const idsDelete = ids.toString();
  return queryPromise(`DELETE FROM funcionario WHERE id_funcionario IN (${idsDelete})`);
}

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteById,
};
