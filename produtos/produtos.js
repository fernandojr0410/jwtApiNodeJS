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
  const { nome_produto, descricao, categoria, preco, quantidade, peso } = dados;
  let sql = `INSERT INTO produto (nome_produto, descricao, categoria, preco, quantidade, peso) VALUES ('${nome_produto}', '${descricao}', '${categoria}', ${preco}, ${quantidade}, ${peso})`;
  return queryPromise(sql);
}

function update(dados) {
  const { id, nome_produto, descricao, categoria, preco, quantidade, peso } =
    dados;
  const params = [];
  let sql = "UPDATE produto SET";

  if (nome_produto) {
    sql += " nome_produto = ?,";
    params.push(nome_produto);
  }

  if (descricao) {
    sql += " descricao = ?,";
    params.push(descricao);
  }

  if (categoria) {
    sql += " categoria = ?,";
    params.push(categoria);
  }

  if (preco) {
    sql += " preco = ?,";
    params.push(preco);
  }

  if (quantidade) {
    sql += " quantidade = ?,";
    params.push(quantidade);
  }

  if (peso) {
    sql += " peso = ?,";
    params.push(peso);
  }

  params.push(id);

  sql = sql.slice(0, -1);

  sql += " WHERE id_produto = ?";
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
