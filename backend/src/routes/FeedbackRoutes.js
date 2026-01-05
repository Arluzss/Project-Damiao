const express = require('express');
const router = express.Router();
const FeedbackController = require('../controller/FeedbackController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/conexao/:conexaoId', FeedbackController.listByConexao);
router.get('/user/:usuarioId', FeedbackController.listByAvaliado);
router.post('/', authenticateToken, FeedbackController.create);

module.exports = router;
