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
  const { nome_cliente, cpf, endereco, telefone, data_nascimento } = dados;
  let sql = `INSERT INTO cliente (nome_cliente, cpf, endereco, telefone, data_nascimento) values ('${nome_cliente}', ${cpf}, '${endereco}', '${telefone}', '${data_nascimento}')`;
  return queryPromise(sql);
}

function update(dados) {
  const { id, nome_cliente, cpf, endereco, telefone, data_nascimento } = dados;
  const params = [];
  let sql = "UPDATE cliente SET ";

  if (nome_cliente) {
    sql += "nome_cliente = ?, ";
    params.push(nome_cliente);
  }

  if (cpf) {
    sql += "cpf = ?, ";
    params.push(cpf);
  }

  if (endereco) {
    sql += "endereco = ?, ";
    params.push(endereco);
  }

  if (telefone) {
    sql += "telefone = ?, ";
    params.push(telefone);
  }

  if (data_nascimento) {
    sql += "data_nascimento = ?, ";
    params.push(data_nascimento);
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
