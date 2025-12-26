const express = require('express');
const { route } = require('../app');
const AuthController = require('../controller/AuthController');

const router = express.Router();

router.get('/', (req, res) => {
  return res.status(200).json({ status: 'ok' });
});

router.post('register', AuthController.register);
router.post('login', AuthController.login);

module.exports = router;
