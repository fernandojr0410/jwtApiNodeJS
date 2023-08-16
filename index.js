const express = require("express");
const bodyParser = require("body-parser");

const conn = require("./db/mysql.js");
const empresas = require("./empresas/empresas.js");
const funcionarios = require("./funcionarios/funcionarios.js");
const clientes = require("./clientes/clientes.js");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

const PORT = 8080;
const HOST = "http://localhost";

// Empresa
app.get("/empresas/findAll", (req, res) => {
  empresas
    .findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/empresas/findById", (req, res) => {
  empresas
    .findById(req.query.id)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post("/empresas/insert", (req, res) => {
  empresas
    .insert(req.body)
    .then(() => {
      res.send("Empresa cadastrada com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.put("/empresas/update", (req, res) => {
  empresas
    .update(req.body)
    .then(() => {
      res.send("Dados atualizados com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.delete("/empresas/delete", (req, res) => {
  empresas
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
      res.send("Dadaos atualizados com sucesso!");
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
      req.send("Registro deletado com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.listen(PORT, () => {
  console.log("Servidor Iniciado");
});
