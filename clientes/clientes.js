const conn = require("../db/mysql.js");
const util = require("util");
const queryPromise = util.promisify(conn().query).bind(conn());

function findAll() {
  return queryPromise("SELECT * FROM cliente");
}

function findById(id) {
  return queryPromise(`SELECT * FROM cliente WHERE id_cliente = ${id}`);
}

function insert(dados) {
  const { nome, cpf, ativo } = dados;
  let sql = `INSERT INTO cliente (nome, cpf, ativo) values ('${nome}', ${cpf}, '${ativo}')`;
  return queryPromise(sql);
}

function update(dados) {
  const { id, nome, cpf, ativo } = dados;
  const params = [];
  let sql = "UPDATE cliente SET ";

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
  sql += " WHERE id_cliente = ?";
  params.push(id);

  return queryPromise(sql, params);
}

function deleteById(ids) {
  const idsDelete = ids.toString();
  return queryPromise(`DELETE FROM cliente WHERE id_cliente IN (${idsDelete})`);
}

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteById,
};
