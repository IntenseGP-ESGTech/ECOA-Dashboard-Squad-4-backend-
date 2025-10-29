const express = require('express');
const router = express.Router();

// Importa o controller que tem a lógica de login
const authController = require('../controllers/authController');

// Quando uma requisição POST chegar para '/login',
// execute a função 'login' do nosso controller.
router.post('/login', authController.login);

// Exporta o router para que o server.js possa usá-lo
module.exports = router;