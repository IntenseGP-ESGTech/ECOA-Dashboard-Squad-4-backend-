const express = require('express');
const router = express.Router();

// Importa o controller que contém a lógica de cadastro
const registerController = require('../controllers/registerController');

// Define as rotas específicas para cada tipo de cadastro
router.post('/empresa', registerController.registerEmpresa);
router.post('/funcionario', registerController.registerFuncionario);
router.post('/representante', registerController.registerRepresentante);
router.post('/filial', registerController.registerFilial);

module.exports = router;