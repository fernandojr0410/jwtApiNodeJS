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
  const {
    nome_cliente,
    cpf,
    endereco,
    telefone,
    data_nascimento,
    id_empresa,
    id_funcionario,
  } = dados;
  let sql = `INSERT INTO cliente (nome_cliente, cpf, endereco, telefone, data_nascimento, id_empresa, id_funcionario) values ('${nome_cliente}', ${cpf}, '${endereco}', '${telefone}', '${data_nascimento}', ${id_empresa}, ${id_funcionario})`;
  return queryPromise(sql);
}

function update(dados) {
  const {
    id,
    nome_cliente,
    cpf,
    endereco,
    telefone,
    data_nascimento,
    id_empresa,
    id_funcionario,
  } = dados;
  const params = [];
  let sql = "UPDATE cliente SET";

  if (nome_cliente) {
    sql += "nome_cliente = ?,";
    params.push(nome_cliente);
  }

  if (cpf) {
    sql += "cpf = ?,";
    params.push(cpf);
  }

  if (endereco) {
    sql += "endereco = ?,";
    params.push(endereco);
  }

  if (telefone) {
    sql += "telefone = ?,";
    params.push(telefone);
  }

  if (data_nascimento) {
    sql += "data_nascimento = ?,";
    params.push(data_nascimento);
  }

  if (id_empresa) {
    sql += "id_empresa = ?,";
    params.push(id_empresa);
  }

  if (id_funcionario) {
    sql += "id_funcionario = ?,";
    params.push(id_funcionario);
  }

  params.push(id);

  sql += sql.slice(0, -1);

  sql += "WHERE id_cliente = ?";
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
