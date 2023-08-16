const conn = require("../db/mysql.js");
const util = require("util");
const queryPromise = util.promisify(conn().query).bind(conn());

function findAll() {
  return queryPromise("SELECT * FROM empresa");
}

function findById(id) {
  return queryPromise(`SELECT * FROM empresa WHERE id_empresa = ${id}`);
}

function insert(dados) {
  const { nome_empresa, cnpj, endereco, telefone } = dados;
  let sql = `INSERT INTO empresa (nome_empresa, cnpj, endereco, telefone) VALUES ('${nome_empresa}', ${cnpj}, '${endereco}', '${telefone}')`;
  return queryPromise(sql);
}

function update(dados) {
  const { id, nome_empresa, cnpj, endereco, telefone } = dados;
  const params = [];
  let sql = "UPDATE empresa SET";

  if (nome_empresa) {
    sql += " nome_empresa = ?,";
    params.push(nome_empresa);
  }

  if (cnpj) {
    sql += " cnpj = ?,";
    params.push(cnpj);
  }

  if (endereco) {
    sql += " endereco = ?,";
    params.push(endereco);
  }

  if (telefone) {
    sql += " telefone = ?,";
    params.push(telefone);
  }

  params.push(id);

  sql = sql.slice(0, -1);

  sql += " WHERE id_empresa = ?";
  return queryPromise(sql, params);
}

function deleteById(ids) {
  const idsDelete = ids.toString();
  return queryPromise(`DELETE FROM empresa WHERE id_empresa IN (${idsDelete})`);
}

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteById,
};
