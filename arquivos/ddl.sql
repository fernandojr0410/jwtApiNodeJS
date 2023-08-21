create database atividade_api;

use atividade_api;

create table cliente(
id_cliente int auto_increment not null,
nome varchar(45) not null,
cpf varchar(11) not null,
ativo tinyint not null,
primary key (id_cliente)
);

create table produto(
id_produto int auto_increment not null,
nome varchar(45) not null,
preco decimal(8,4) not null,
ativo tinyint not null,
primary key (id_produto)
);

create table funcionario (
id_funcionario int auto_increment not null,
nome varchar(45) not null,
cpf varchar(11) not null,
ativo tinyint not null,
primary key (id_funcionario)
);

create table pedido (
id_pedido int auto_increment not null,
id_funcionario int not null,
id_cliente int not null,
primary key (id_pedido),
foreign key (id_funcionario) references funcionario (id_funcionario)
);

create table item_pedido(
id_pedido int not null,
id_produto int not null,
foreign key (id_pedido) references pedido (id_pedido),
foreign key (id_produto) references produto (id_produto)
);

