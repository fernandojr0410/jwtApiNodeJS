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

  let sql = `INSERT INTO produto (nome, preco, ativo) values ('${nome}', ${preco}, ${
    ativo ? 1 : 0
  })`;
  return queryPromise(sql);
}

function update(dados) {
  const { idProduto, nome, preco, ativo } = dados;
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
  params.push(idProduto);

  return queryPromise(sql, params);
}

function deleteById(id) {
  return queryPromise(`DELETE FROM produto WHERE id_produto IN (${id})`);
}

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteById,
};
