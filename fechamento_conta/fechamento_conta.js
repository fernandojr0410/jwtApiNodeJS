const conn = require("../db/mysql.js");
const util = require("util");
const queryPromise = util.promisify(conn().query).bind(conn());

function fecharConta(dados) {
  const { status, quantidade_pessoa, pagamento, observacao, id_pedido } = dados;

  if (quantidade_pessoa > 4) {
    return Promise.reject(
      "O fechamento do pedido é permitido para no máximo 4 pessoas."
    );
  }

  return atualizarStatusPedidos(id_pedido)
    .then(() => {
      return calcularTotalConta(id_pedido);
    })
    .then((total_conta) => {
      const valor_individual = total_conta / quantidade_pessoa;

      const sql = `
              INSERT INTO conta (status, quantidade_pessoa, total_conta, valor_individual, pagamento, observacao)
              VALUES (${status}, ${quantidade_pessoa}, ${total_conta}, ${valor_individual}, '${pagamento}', '${observacao}')`;

      const params = [
        status,
        quantidade_pessoa,
        total_conta,
        valor_individual,
        pagamento,
        observacao,
      ];

      return queryPromise(sql, params);
    });
}

function criarConta(total_conta, valor_individual, pagamento) {
  const status = 1;
  const quantidade_pessoa = 4;
  const observacao = "Conta criada automaticamente";

  const sql = `
      INSERT INTO conta (status, quantidade_pessoa, total_conta, valor_individual, pagamento, observacao)
      VALUES (${status}, ${quantidade_pessoa}, ${total_conta}, ${valor_individual}, '${pagamento}', '${observacao}')`;

  const params = [
    status,
    quantidade_pessoa,
    total_conta,
    valor_individual,
    pagamento,
    observacao,
  ];

  return queryPromise(sql, params);
}

function calcularTotalConta(id_pedido) {
  return queryPromise(
    `SELECT SUM(produto.preco) AS total FROM item_pedido 
        INNER JOIN produto ON item_pedido.id_produto = produto.id_produto
        WHERE item_pedido.id_pedido = ${id_pedido}`
  ).then((result) => {
    return result[0].total || 0;
  });
}

function associarPedidosConta(id_pedido, id_conta) {
  const sql = `INSERT INTO pedido_conta (id_pedido, id_conta) VALUES (${id_pedido}, ${id_conta})`;
  const params = [id_pedido, id_conta];

  return queryPromise(sql, params);
}

function atualizarStatusPedidos(id_pedido) {
  return queryPromise(
    `UPDATE pedido SET status = 'Fechado' WHERE id_pedido = ${id_pedido}`
  );
}

function gerarRelatorioProducaoCozinha(id_conta) {
  const sql = `
  SELECT 
  pr.id_produto, pr.nome AS produto_nome, pr.preco, pr.ativo,
  cl.id_cliente, cl.nome AS cliente_nome, cl.cpf, cl.ativo AS cliente_ativo,
  p.id_pedido, p.id_funcionario, p.id_cliente AS pedido_id_cliente, p.status,
  f.id_funcionario, f.nome AS funcionario_nome,
  c.id_conta, c.status, c.quantidade_pessoa, c.total_conta, c.valor_individual, c.pagamento
  FROM item_pedido ip
  JOIN produto pr ON ip.id_produto = pr.id_produto
  JOIN pedido p ON ip.id_pedido = p.id_pedido
  JOIN cliente cl ON p.id_cliente = cl.id_cliente
  JOIN funcionario f ON p.id_funcionario = f.id_funcionario
  JOIN pedido_conta pc ON p.id_pedido = pc.id_pedido
  JOIN conta c ON pc.id_conta = c.id_conta
  WHERE c.id_conta = ${id_conta}`;

  return queryPromise(sql).then((result) => {
    const report = result.map((item) => ({
      produto: {
        id_produto: item.id_produto,
        nome: item.produto_nome,
        preco: item.preco,
        ativo: item.ativo,
      },
      cliente: {
        id_cliente: item.id_cliente,
        nome: item.cliente_nome,
        cpf: item.cpf,
        ativo: item.cliente_ativo,
      },
      pedido: {
        id_pedido: item.id_pedido,
        id_funcionario: item.id_funcionario,
        id_cliente: item.pedido_id_cliente,
        status: item.status,
      },
      funcionario: {
        id_funcionario: item.id_funcionario,
        nome: item.funcionario_nome,
      },
      conta: {
        id_conta: item.id_conta,
        status: item.status,
        quantidade_pessoa: item.quantidade_pessoa,
        total_conta: item.total_conta,
        valor_individual: item.valor_individual,
        pagamento: item.pagamento,
      },
    }));
    return report;
  });
}

module.exports = {
  fecharConta,
  criarConta,
  calcularTotalConta,
  associarPedidosConta,
  atualizarStatusPedidos,
  gerarRelatorioProducaoCozinha,
};
