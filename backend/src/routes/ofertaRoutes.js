const express = require('express');
const router = express.Router();
const OfertaController = require('../controller/ofertaController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', OfertaController.list);
router.get('/:id', OfertaController.getById);
router.post('/', authenticateToken, OfertaController.create);
router.put('/:id', authenticateToken, OfertaController.update);
router.delete('/:id', authenticateToken, OfertaController.remove);

module.exports = router;