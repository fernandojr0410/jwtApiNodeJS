const express = require("express");
const bodyParser = require("body-parser");

const conn = require("./db/mysql.js");
const clientes = require("./clientes/clientes.js");
const funcionarios = require("./funcionarios/funcionarios.js");
const produtos = require("./produtos/produtos.js");
const pedidos = require("./pedidos/pedidos.js");
const itens_pedidos = require("./itens_pedidos/itens_pedidos.js");
const contas = require("./contas/contas.js");
const pedidos_contas = require("./pedidos_contas/pedidos_contas.js");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

const PORT = 8080;
const HOST = "http://localhost";

// Clientes
app.get("/clientes/findAll", (req, res) => {
  clientes
    .findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/clientes/findById", (req, res) => {
  clientes
    .findById(req.query.id)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post("/clientes/insert", (req, res) => {
  clientes
    .insert(req.body)
    .then(() => {
      res.send("Cliente cadastrado com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.put("/clientes/update", (req, res) => {
  clientes
    .update(req.body)
    .then(() => {
      res.send("Dados atualizados com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.delete("/clientes/delete", (req, res) => {
  clientes
    .deleteById(req.body)
    .then(() => {
      res.send("Registro deletado com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

// Funcionarios
app.get("/funcionarios/findAll", (req, res) => {
  funcionarios
    .findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/funcionarios/findById", (req, res) => {
  funcionarios
    .findById(req.query.id)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post("/funcionarios/insert", (req, res) => {
  funcionarios
    .insert(req.body)
    .then(() => {
      res.send("Funcionario cadastrado com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.put("/funcionarios/update", (req, res) => {
  funcionarios
    .update(req.body)
    .then(() => {
      res.send("Dados atualizados com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.delete("/funcionarios/delete", (req, res) => {
  funcionarios
    .deleteById(req.body)
    .then(() => {
      res.send("Registro deletado com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

//Produtos
app.get("/produtos/findAll", (req, res) => {
  produtos
    .findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/produtos/findById", (req, res) => {
  produtos
    .findById(req.query.id)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post("/produtos/insert", (req, res) => {
  produtos
    .insert(req.body)
    .then(() => {
      res.send("Produto cadastrado com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.put("/produtos/update", (req, res) => {
  produtos
    .update(req.body)
    .then(() => {
      res.send("Dados atualizados com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.delete("/produtos/delete", (req, res) => {
  produtos
    .deleteById(req.body)
    .then(() => {
      res.send("Registro deletado com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

//Pedidos
app.get("/pedidos/findAll", (req, res) => {
  pedidos
    .findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/pedidos/findById", (req, res) => {
  pedidos
    .findById(req.query.id)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post("/pedidos/insert", (req, res) => {
  pedidos
    .insert(req.body)
    .then(() => {
      res.send("Pedido realizado com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.put("/pedidos/update", (req, res) => {
  pedidos
    .update(req.body)
    .then(() => {
      res.send("Pedido atualizados com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.delete("/pedidos/delete", (req, res) => {
  pedidos
    .deleteById(req.body)
    .then(() => {
      res.send("Pedido deletado com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

//Itens Pedidos
app.get("/itens_pedidos/findAll", (req, res) => {
  itens_pedidos
    .findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/itens_pedidos/findById", (req, res) => {
  itens_pedidos
    .findById(req.query.id)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post("/itens_pedidos/insert", (req, res) => {
  itens_pedidos
    .insert(req.body)
    .then(() => {
      res.send("Pedido realizado com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.put("/itens_pedidos/update", (req, res) => {
  itens_pedidos
    .update(req.body)
    .then(() => {
      res.send("Pedido atualizados com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.delete("/itens_pedidos/delete", (req, res) => {
  itens_pedidos
    .deleteById(req.body)
    .then(() => {
      res.send("Pedido deletado com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

// Pedidos_Contas
app.get("/pedidos_contas/findAll", (req, res) => {
  pedidos_contas
    .findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/pedidos_contas/findById", (req, res) => {
  pedidos_contas
    .findById(req.query.id)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post("/pedidos_contas/insert", (req, res) => {
  pedidos_contas
    .insert(req.body)
    .then(() => {
      res.send("Pedido realizado com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.put("/pedidos_contas/update", (req, res) => {
  pedidos_contas
    .update(req.body)
    .then(() => {
      res.send("Pedido atualizados com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.delete("/pedidos_contas/delete", (req, res) => {
  pedidos_contas
    .deleteById(req.body)
    .then(() => {
      res.send("Pedido deletado com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

//Fechamento da Conta
app.post("/contas/fechamento_conta/insert", async (req, res) => {
  try {
    const { id_pedido, quantidade_pessoa, pagamento } = req.body;

    //Fechar conta
    if (quantidade_pessoa > 4) {
      res.send("O fechamento do pedido é permitido para no máximo 4 pessoas.");
    }

    // Calcular total da conta
    const total_conta = await contas.calcularTotalConta(id_pedido);

    // Calcular valor por pessoa
    const valor_individual = total_conta / quantidade_pessoa;

    // Criar registro na tabela de contas
    const id_conta = await contas.criarConta(
      total_conta,
      valor_individual,
      pagamento
    );

    // Associar pedidos à conta
    contas
      .associarPedidosConta(2, 5)
      .then(() => {
        res.send("Pedido associado à conta com sucesso.");
      })
      .catch((error) => {
        console.error(error);
        res.send(error);
      });

    // Atualizar status dos pedidos
    await contas.atualizarStatusPedidos(id_pedido);

    res.send("Conta fechada com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao fechar conta.");
  }
});

app.get("/contas/fechamento_conta/findAll", (req, res) => {
  contas
    .findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/contas/fechamento_conta/findById", (req, res) => {
  contas
    .findById(req.query.id)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.put("/contas/fechamento_conta/update", (req, res) => {
  contas
    .update(req.body)
    .then(() => {
      res.send("Pedido atualizados com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.delete("/contas/fechamento_conta/delete", (req, res) => {
  contas
    .deleteById(req.body)
    .then(() => {
      res.send("Conta deletada com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

//Relatório Cozinha
app.get("/contas/relatorio_cozinha/:id_pedido", async (req, res) => {
  const id_pedido = req.params.id_pedido;

  try {
    const relatorio = await contas.gerarRelatorioProducaoCozinha(id_pedido);
    res.json(relatorio);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao gerar relatório de produção para a cozinha.");
  }
});

app.listen(PORT, () => {
  console.log("Servidor Iniciado");
});
