-- Apaga as tabelas se elas já existirem, para garantir um setup limpo.
DROP TABLE IF EXISTS filiais;
DROP TABLE IF EXISTS representantes;
DROP TABLE IF EXISTS funcionarios;
DROP TABLE IF EXISTS empresas;

-- Tabela para Empresas (Sintaxe SQLite)
CREATE TABLE empresas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cnpj TEXT NOT NULL UNIQUE,
    email_corporativo TEXT NOT NULL UNIQUE,
    nome_social TEXT NOT NULL,
    senha_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para Funcionários (Sintaxe SQLite)
DROP TABLE IF EXISTS funcionarios;

CREATE TABLE funcionarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cargo TEXT,
    email_institucional TEXT NOT NULL UNIQUE,
    telefone TEXT,
    matricula TEXT,
    senha_hash TEXT, -- Pode ser opcional se for apenas um cadastro de gestão
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para Representantes (Sintaxe SQLite)
CREATE TABLE representantes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cpf TEXT NOT NULL UNIQUE,
    email_institucional TEXT NOT NULL UNIQUE,
    nome_completo TEXT NOT NULL,
    senha_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
-- Tabela para Filial (Sintaxe SQLite)
CREATE TABLE filiais (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cnpj TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    codigo_unidade TEXT NOT NULL UNIQUE,
    nome_social TEXT NOT NULL,
    senha_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);