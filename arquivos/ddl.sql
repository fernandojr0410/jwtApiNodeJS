create database atividade_API;

use atividade_API;

create table cliente(
id_cliente int auto_increment not null,
nome varchar(45) not null,
cpf varchar(14) not null,
ativo tinyint not null,
primary key (id_cliente)
);

create table funcionario(
id_funcionario int auto_increment not null,
nome varchar(45) not null,
cpf varchar(14) not null,
ativo tinyint not null,
primary key (id_funcionario)
);

create table produto(
id_produto int auto_increment not null,
nome varchar(200) not null,
preco decimal(5,2) not null,
ativo tinyint not null,
primary key (id_produto)
);

create table pedido(
id_pedido int auto_increment not null,
id_funcionario int not null,
id_cliente int not null,
status varchar(45) not null,
primary key (id_pedido),
foreign key (id_funcionario) references funcionario (id_funcionario),
foreign key (id_cliente) references cliente (id_cliente)
);

create table item_pedido(
id_pedido int not null,
id_produto int not null,
foreign key (id_pedido) references pedido (id_pedido),
foreign key (id_produto) references produto (id_produto)
);

create table conta(
id_conta int auto_increment not null,
status tinyint not null,
quantidade_pessoa int not null,
total_conta decimal(5,2) not null,
valor_individual decimal(5,2) not null,
pagamento varchar(45) not null,
observacao varchar(45) not null,
primary key (id_conta)
);

create table pedido_conta(
id_pedido int not null,
id_conta int not null,
foreign key (id_pedido) references pedido (id_pedido),
foreign key (id_conta) references conta (id_conta)
);