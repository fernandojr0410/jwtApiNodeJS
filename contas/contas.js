const conn = require("../db/mysql.js");
const util = require("util");
const queryPromise = util.promisify(conn().query).bind(conn());

function findAll() {
  return queryPromise("SELECT * FROM conta");
}

function findById(id) {
  return queryPromise(`SELECT * FROM conta WHERE id_conta = ${id}`);
}

function insert(dados) {
  const {
    status,
    quantidadePessoa,
    totalConta,
    valorIndividual,
    pagamento,
    observacao,
  } = dados;

  const statusNumerico = status === "1" ? 1 : 0;
  const quantidadePessoaNumerico = parseInt(quantidadePessoa);
  const totalContaDecimal = parseFloat(totalConta);
  const valorIndividualDecimal = parseFloat(valorIndividual);

  const sql =
    "INSERT INTO conta (status, quantidade_pessoa, total_conta, valor_individual, pagamento, observacao) VALUES (?, ?, ?, ?, ?, ?)";

  const values = [
    statusNumerico,
    quantidadePessoaNumerico,
    totalContaDecimal,
    valorIndividualDecimal,
    pagamento,
    observacao,
  ];

  return queryPromise(sql, values);
}

function update(dados) {
  const {
    idConta,
    status,
    quantidade_pessoa,
    total_conta,
    valor_individual,
    pagamento,
    observacao,
  } = dados;
  const params = [];
  let sql = "UPDATE conta SET ";

  if (status) {
    sql += "status = ?, ";
    params.push(status);
  }

  if (quantidade_pessoa) {
    sql += "quantidade_pessoa = ?, ";
    params.push(quantidade_pessoa);
  }

  if (total_conta) {
    sql += "total_conta = ?, ";
    params.push(total_conta);
  }

  if (valor_individual) {
    sql += "valor_individual = ?, ";
    params.push(valor_individual);
  }

  if (pagamento) {
    sql += "pagamento = ?, ";
    params.push(pagamento);
  }

  if (observacao) {
    sql += "observacao = ?, ";
    params.push(observacao);
  }
  sql = sql.slice(0, -2);
  sql += " WHERE id_conta = ?";
  params.push(idConta);

  return queryPromise(sql, params);
}

function deleteById(id) {
  return queryPromise(`DELETE FROM conta WHERE id_conta IN (${id})`);
}

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteById,
};
