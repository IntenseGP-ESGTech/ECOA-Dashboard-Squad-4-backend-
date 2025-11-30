const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const verifyToken = require('../middlewares/authMiddleware'); // Importa o segurança

// Adiciona 'verifyToken' antes das funções do controller
router.get('/', verifyToken, teamController.getAllMembers);
router.post('/', verifyToken, teamController.addMember);
router.put('/:id', verifyToken, teamController.updateMember);
router.delete('/:id', verifyToken, teamController.deleteMember);

module.exports = router;