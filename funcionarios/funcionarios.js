const conn = require("../db/mysql.js");
const util = require("util");
const queryPromise = util.promisify(conn().query).bind(conn());

function findAll() {
  return queryPromise("SELECT * FROM funcionario");
}

function findById(id) {
  return queryPromise(`SELECT * FROM funcionario WHERE id_funcionario = ${id}`);
}

function insert(dados) {
  const { nome_completo, cpf, setor, cargo } = dados;
  let sql = `INSERT INTO funcionario (nome_completo, cpf, setor, cargo) VALUES ('${nome_completo}', ${cpf}, '${setor}', '${cargo}')`;
  return queryPromise(sql);
}

function update(dados) {
  const { id, nome_completo, cpf, setor, cargo } = dados;
  const params = [];
  let sql = "UPDATE funcionario SET";

  if (nome_completo) {
    sql += " nome_completo = ?,";
    params.push(nome_completo);
  }

  if (cpf) {
    sql += " cpf = ?,";
    params.push(cpf);
  }

  if (setor) {
    sql += " setor = ?,";
    params.push(setor);
  }

  if (cargo) {
    sql += " cargo = ?,";
    params.push(cargo);
  }

  params.push(id);

  sql = sql.slice(0, -1);

  sql += " WHERE id_funcionario = ?";
  return queryPromise(sql, params);
}

function deleteById(ids) {
  const idsDelete = ids.toString();
  return queryPromise(
    `DELETE FROM funcionario WHERE id_funcionario IN (${idsDelete})`
  );
}

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteById,
};
