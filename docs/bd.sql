DROP DATABASE IF EXISTS clinica;
CREATE DATABASE clinica;
USE clinica;

CREATE TABLE clientes(
    id_cliente INTEGER PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(255) NOT NULL,
    nascimento VARCHAR(255) NOT NULL
);

CREATE TABLE medicos(
    id_medico INTEGER PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    crm VARCHAR(20) NOT NULL,
    especialidade VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE consultas(
    id_consulta INTEGER PRIMARY KEY AUTO_INCREMENT,
    data_hora DATETIME NOT NULL,
    id_medico INTEGER NOT NULL,
    id_paciente INTEGER NOT NULL,
    motivo TEXT,
    FOREIGN KEY (id_medico) REFERENCES medicos(id_medico),
    FOREIGN KEY (id_paciente) REFERENCES clientes(id_cliente)
);

ALTER TABLE clientes CHANGE COLUMN nascimento nascimento DATE;
DESCRIBE clientes;
DESCRIBE medicos;
DESCRIBE consultas;
