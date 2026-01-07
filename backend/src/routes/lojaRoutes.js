const express = require('express');
const router = express.Router();
const lojaController = require('../controller/lojaController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/redeem', authMiddleware, lojaController.redeem); // POST, loja e redeem autenticados  

module.exports = router;