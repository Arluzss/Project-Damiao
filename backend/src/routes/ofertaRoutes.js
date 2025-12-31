const express = require('express');
const router = express.Router();
const offerController = require('../controller/offer.controller');
const authMiddleware = require('../middlewares/auth.middleware'); 

router.post('/', authMiddleware, offerController.create);
router.get('/', offerController.index);
router.get('/:id', offerController.show);

module.exports = router;