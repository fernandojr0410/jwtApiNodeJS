const conn = require("../db/mysql.js");
const util = require("util");
const queryPromise = util.promisify(conn().query).bind(conn());

function findAll() {
  return queryPromise("SELECT * FROM produto");
}

function findById(id) {
  return queryPromise(`SELECT * FROM produto WHERE id_produto = ${id}`);
}

function insert(dados) {
  const { nome, preco, ativo } = dados;
  let sql = `INSERT INTO produto (nome, preco, ativo) values ('${nome}', ${preco}, '${ativo}')`;
  return queryPromise(sql);
}

function update(dados) {
  const { id, nome, preco, ativo } = dados;
  const params = [];
  let sql = "UPDATE produto SET ";

  if (nome) {
    sql += "nome = ?, ";
    params.push(nome);
  }

  if (preco) {
    sql += "preco = ?, ";
    params.push(preco);
  }

  if (ativo) {
    sql += "ativo = ?, ";
    params.push(ativo);
  }

  sql = sql.slice(0, -2);
  sql += " WHERE id_produto = ?";
  params.push(id);

  return queryPromise(sql, params);
}

function deleteById(ids) {
  const idsDelete = ids.toString();
  return queryPromise(`DELETE FROM produto WHERE id_produto IN (${idsDelete})`);
}

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteById,
};
