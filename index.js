const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const conn = require("./db/mysql.js");
const funcionarios = require("./funcionarios/funcionarios.js");
const clientes = require("./clientes/clientes.js");
const produtos = require("./produtos/produtos.js");
const pedidos = require("./pedidos/pedidos.js");
const contas = require("./contas/contas.js");
const pedidos_contas = require("./pedidos_contas/pedidos_contas.js");
const itens_pedidos = require("./itens_pedidos/itens_pedidos.js");
const fechamento_conta = require("./fechamento_conta/fechamento_conta.js");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
const SECRET_KEY = "fernandojr";

const PORT = 8080;
const HOST = "http://localhost";

function verificarToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ mensagem: "Token não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.usuario = decoded;
    next();
  } catch (excecao) {
    return res.status(400).json({ mensagem: "Token inválido." });
  }
}

app.post("/login",  (req, res) => {
  const { usuario, senha } = req.body;

  // Verificar as credenciais e gerar o token
  if (usuario === "fernandojr" && senha === "fernandojr") {
    const token = jwt.sign({ usuario }, SECRET_KEY);
    res.json({ token });
  } else {
    res.status(401).json({ mensagem: "Credenciais inválidas." });
  }
});

app.use(verificarToken);

// Funcionarios
app.get("/funcionarios/findAll", verificarToken, (req, res) => {
  funcionarios
    .findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/funcionarios/findById", verificarToken, (req, res) => {
  funcionarios
    .findById(req.query.id)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post("/funcionarios/insert", verificarToken, (req, res) => {
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

app.put("/funcionarios/update", verificarToken, (req, res) => {
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

app.delete("/funcionarios/delete", verificarToken, (req, res) => {
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

// Clientes
app.get("/clientes/findAll", verificarToken, (req, res) => {
  clientes
    .findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/clientes/findById", verificarToken, (req, res) => {
  clientes
    .findById(req.query.id)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post("/clientes/insert", verificarToken, (req, res) => {
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

app.put("/clientes/update", verificarToken, (req, res) => {
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

app.delete("/clientes/delete", verificarToken, (req, res) => {
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

//Produtos
app.get("/produtos/findAll", verificarToken, (req, res) => {
  produtos
    .findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/produtos/findById", verificarToken, (req, res) => {
  produtos
    .findById(req.query.id)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post("/produtos/insert", verificarToken, (req, res) => {
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

app.put("/produtos/update", verificarToken, (req, res) => {
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

app.delete("/produtos/delete", verificarToken, (req, res) => {
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
app.get("/pedidos/findAll", verificarToken, (req, res) => {
  pedidos
    .findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/pedidos/findById", verificarToken, (req, res) => {
  pedidos
    .findById(req.query.id)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post("/pedidos/insert", verificarToken, (req, res) => {
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

app.put("/pedidos/update", verificarToken, (req, res) => {
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

app.delete("/pedidos/delete", verificarToken, (req, res) => {
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

//Conta
app.get("/contas/findAll", verificarToken, (req, res) => {
  contas
    .findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/contas/findById", verificarToken, (req, res) => {
  contas
    .findById(req.query.id)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post("/contas/insert", verificarToken, (req, res) => {
  contas
    .insert(req.body)
    .then(() => {
      res.send("Pedido realizado com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.put("/contas/update", verificarToken, (req, res) => {
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

app.delete("/contas/delete", verificarToken, (req, res) => {
  contas
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
app.get("/pedidos_contas/findAll", verificarToken, (req, res) => {
  pedidos_contas
    .findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/pedidos_contas/findById", verificarToken, (req, res) => {
  pedidos_contas
    .findById(req.query.id)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post("/pedidos_contas/insert", verificarToken, (req, res) => {
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

app.put("/pedidos_contas/update", verificarToken, (req, res) => {
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

app.delete("/pedidos_contas/delete", verificarToken, (req, res) => {
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

//Itens Pedidos
app.get("/itens_pedidos/findAll", verificarToken, (req, res) => {
  itens_pedidos
    .findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/itens_pedidos/findById", verificarToken, (req, res) => {
  itens_pedidos
    .findById(req.query.id)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post("/itens_pedidos/insert", verificarToken, (req, res) => {
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

app.put("/itens_pedidos/update", verificarToken, (req, res) => {
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

app.delete("/itens_pedidos/delete", verificarToken, (req, res) => {
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

//Fechamento da Conta
app.post(
  "/contas/fechamento_conta/insert",
  verificarToken,
  async (req, res) => {
    try {
      const { id_pedido, quantidade_pessoa, pagamento } = req.body;

      //Fechar conta
      if (quantidade_pessoa > 4) {
        res.send(
          "O fechamento do pedido é permitido para no máximo 4 pessoas."
        );
      }

      // Calcular total da conta
      const total_conta = await fechamento_conta.calcularTotalConta(id_pedido);

      // Calcular valor por pessoa
      const valor_individual = total_conta / quantidade_pessoa;

      // Criar registro na tabela de contas
      const id_conta = await fechamento_conta.criarConta(
        total_conta,
        valor_individual,
        pagamento
      );

      // Associar pedidos à conta
      fechamento_conta
        .associarPedidosConta(2, 5)
        .then(() => {
          res.send("Pedido associado à conta com sucesso.");
        })
        .catch((error) => {
          console.error(error);
          res.send(error);
        });

      // Atualizar status dos pedidos
      await fechamento_conta.atualizarStatusPedidos(id_pedido);

      res.send("Conta fechada com sucesso!");
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao fechar conta.");
    }
  }
);

//Relatório Cozinha
app.get("/relatorio_cozinha/:id_pedido", verificarToken, async (req, res) => {
  const id_pedido = req.params.id_pedido;

  try {
    const relatorio = await fechamento_conta.gerarRelatorioProducaoCozinha(
      id_pedido
    );
    res.json(relatorio);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao gerar relatório de produção para a cozinha.");
  }
});

app.listen(PORT, () => {
  console.log("Servidor Iniciado");
});
