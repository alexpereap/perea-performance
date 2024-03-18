const express = require('express');

const router = new express.Router();

const { login, register, testAuth } = require('../controllers/auth.controller');
const verifyToken = require('../middlewares/auth.middleware');

router.post('/login', login);
router.post('/register', verifyToken, register);
router.get('/testauth', verifyToken, testAuth);

module.exports = router;
