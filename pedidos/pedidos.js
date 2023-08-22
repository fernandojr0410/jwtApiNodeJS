const conn = require("../db/mysql.js");
const util = require("util");
const queryPromise = util.promisify(conn().query).bind(conn());

function findAll() {
  return queryPromise("SELECT * FROM pedido");
}

function findById(id) {
  return queryPromise(`SELECT * FROM pedido WHERE id_pedido = ${id}`);
}

function insert(dados) {
  const { id_pedido, id_funcionario, id_cliente } = dados;
  let sql = `INSERT INTO pedido (id_pedido, id_funcionario, id_cliente) values (${id_pedido}, ${id_funcionario}, ${id_cliente})`;
  return queryPromise(sql);
}

function update(dados) {
  const { id_pedido, id_funcionario, id_cliente } = dados;
  const params = [];
  let sql = "UPDATE pedido SET ";

  if (id_pedido) {
    sql += "id_pedido = ?, ";
    params.push(id_pedido);
  }

  if (id_funcionario) {
    sql += "id_funcionario = ?, ";
    params.push(id_funcionario);
  }

  if (id_cliente) {
    sql += "id_cliente = ?, ";
    params.push(id_cliente);
  }

  sql = sql.slice(0, -2);
  sql += " WHERE id_produto = ?";
  params.push(id_pedido);

  return queryPromise(sql, params);
}

function deleteById(ids) {
  const idsDelete = ids.toString();
  return queryPromise(`DELETE FROM pedido WHERE id_pedido IN (${idsDelete})`);
}

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteById,
};
