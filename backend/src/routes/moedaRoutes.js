const express = require('express');
const router = express.Router();
const moedaController = require('../controller/moedaController');
const { authenticateToken } = require('../middleware/authMiddleware');

// rotas de moedas exigem autenticação
router.get('/', authenticateToken, moedaController.getUserPoints);
router.post('/', authenticateToken, moedaController.addPoints);

module.exports = router;