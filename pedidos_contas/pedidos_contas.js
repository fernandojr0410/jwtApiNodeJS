const conn = require("../db/mysql.js");
const util = require("util");
const queryPromise = util.promisify(conn().query).bind(conn());

function findAll() {
  return queryPromise("SELECT * FROM pedido_conta");
}

function findById(id_pedido, id_conta) {
  return queryPromise(
    `SELECT * FROM pedido_conta WHERE id_pedido = ${id_pedido} AND id_conta = ${id_conta}`
  );
}

function insert(dados) {
  const { id_pedido, id_conta } = dados;
  let sql = `INSERT INTO pedido_conta (id_pedido, id_conta) values (${id_pedido}, ${id_conta})`;
  return queryPromise(sql);
}

function update(dados) {
  const { id_pedido, id_conta } = dados;
  const params = [];
  let sql = "UPDATE pedido_conta SET ";

  if (id_pedido) {
    sql += "id_pedido = ?, ";
    params.push(id_pedido);
  }

  if (id_conta) {
    sql += "id_conta = ?, ";
    params.push(id_conta);
  }

  sql = sql.slice(0, -2);
  sql += " WHERE id_pedido AND id_conta = ?";
  params.push(id_pedido, id_conta);

  return queryPromise(sql, params);
}

function deleteById(ids) {
  const { id_pedido, id_conta } = ids;
  return queryPromise(
    `DELETE FROM pedido_conta WHERE id_pedido = ? AND id_conta = ?`,
    [id_pedido, id_conta]
  );
}

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteById,
};
