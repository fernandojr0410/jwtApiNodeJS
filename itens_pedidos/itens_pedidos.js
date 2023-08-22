const conn = require("../db/mysql.js");
const util = require("util");
const queryPromise = util.promisify(conn().query).bind(conn());

function findAll() {
  return queryPromise("SELECT * FROM item_pedido AND id_produto");
}

function findById(id) {
  return queryPromise(
    `SELECT * FROM item_pedido WHERE id_pedido AND id_produto = ${id}`
  );
}

function insert(dados) {
  const { id_pedido, id_produto } = dados;
  let sql = `INSERT INTO item_pedido (id_pedido, id_produto) values (${id_pedido}, ${id_produto})`;
  return queryPromise(sql);
}

function update(dados) {
  const { id_pedido, id_produto } = dados;
  const params = [];
  let sql = "UPDATE item_pedido SET ";

  if (id_pedido) {
    sql += "id_pedido = ?, ";
    params.push(id_pedido);
  }

  if (id_produto) {
    sql += "id_produto = ?, ";
    params.push(id_produto);
  }

  sql = sql.slice(0, -2);
  sql += " WHERE id_pedido AND id_produto = ?";
  params.push(id_pedido, id_produto);

  return queryPromise(sql, params);
}

function deleteById(ids) {
  const idsDelete = ids.toString();
  return queryPromise(
    `DELETE FROM pedido WHERE id_pedido AND id_produto IN (${idsDelete})`
  );
}

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteById,
};
