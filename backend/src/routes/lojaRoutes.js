const express = require('express');
const router = express.Router();
const lojaController = require('../controller/lojaController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/redeem', authenticateToken, lojaController.redeem); // POST, loja e redeem autenticados  

module.exports = router;