const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const ProfileController = require('../controller/ProfileController');

const router = express.Router();

router.get('/me', authenticateToken, ProfileController.me);
router.put('/', authenticateToken, ProfileController.update);
router.get('/courses', authenticateToken, ProfileController.courses);
router.get('/balance', authenticateToken, ProfileController.balance);

module.exports = router;
