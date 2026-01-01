const express = require('express');
const router = express.router();
const moedaController = require ('../controller/moedaController');
const authMiddleware = require('../middlewares/auth.middleware');

// ambos iram exigir autorização de  (token)

router.get('/', authMiddleware, moedaController.getUserPoints);
router.post('/', authMiddleware, moedaController.addPoints);

module.exports = router;