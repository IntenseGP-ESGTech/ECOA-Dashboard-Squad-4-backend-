const bcrypt = require('bcryptjs');
const db = require('../config/database'); // Importa a conexão do banco

// Função genérica para tratar erros
const handleError = (res, error) => {
  if (error.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ message: "Dados duplicados. Verifique CNPJ, CPF, E-mail ou Matrícula." });
  }
  console.error(error);
  return res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
};

// Controller para cadastrar Empresa
const registerEmpresa = async (req, res) => {
  const { cnpj, email, nomeSocial, senha } = req.body;

  if (!cnpj || !email || !nomeSocial || !senha) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    await db.execute(
      'INSERT INTO empresas (cnpj, email_corporativo, nome_social, senha_hash) VALUES (?, ?, ?, ?)',
      [cnpj, email, nomeSocial, senhaHash]
    );
    res.status(201).json({ message: "Empresa cadastrada com sucesso!" });
  } catch (error) {
    handleError(res, error);
  }
};

// Controller para cadastrar Funcionário
const registerFuncionario = async (req, res) => {
    const { email, matricula, senha } = req.body;

    if (!email || !matricula || !senha) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    try {
        const senhaHash = await bcrypt.hash(senha, 10);
        await db.execute(
            'INSERT INTO funcionarios (email_institucional, matricula, senha_hash) VALUES (?, ?, ?)',
            [email, matricula, senhaHash]
        );
        res.status(201).json({ message: "Funcionário cadastrado com sucesso!" });
    } catch (error) {
        handleError(res, error);
    }
};

// Controller para cadastrar Representante
const registerRepresentante = async (req, res) => {
    const { cpf, email, nomeCompleto, senha } = req.body;

    if (!cpf || !email || !nomeCompleto || !senha) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

     try {
        const senhaHash = await bcrypt.hash(senha, 10);
        await db.execute(
            'INSERT INTO representantes (cpf, email_institucional, nome_completo, senha_hash) VALUES (?, ?, ?, ?)',
            [cpf, email, nomeCompleto, senhaHash]
        );
        res.status(201).json({ message: "Representante cadastrado com sucesso!" });
    } catch (error) {
        handleError(res, error);
    }
};

// Controller para cadastrar Filial
const registerFilial = async (req, res) => {
    const { cnpj, codigoUnidade, nomeSocial, senha } = req.body;

    if (!cnpj || !codigoUnidade || !nomeSocial || !senha) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

     try {
        const senhaHash = await bcrypt.hash(senha, 10);
        await db.execute(
            'INSERT INTO filiais (cnpj, codigo_unidade, nome_social, senha_hash) VALUES (?, ?, ?, ?)',
            [cnpj, codigoUnidade, nomeSocial, senhaHash]
        );
        res.status(201).json({ message: "Filial cadastrada com sucesso!" });
    } catch (error) {
        handleError(res, error);
    }
};


// Exporta todas as funções para serem usadas nas rotas
module.exports = {
  registerEmpresa,
  registerFuncionario,
  registerRepresentante,
  registerFilial,
};