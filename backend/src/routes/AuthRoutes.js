const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const AuthController = require('../controller/AuthController');

const router = express.Router();

router.get('/', (req, res) => {
  return res.status(200).json({ status: 'ok' });
});

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

router.get('/me', authenticateToken, (req, res) => {
  return res.status(200).json({ usuario: req.user });
});

module.exports = router;
