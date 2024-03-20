const express = require('express');

const router = new express.Router();

const { login, register, isAuthorized } = require('../controllers/auth.controller');
const verifyToken = require('../middlewares/auth.middleware');

router.post('/login', login);
router.post('/register', verifyToken, register);
router.post('/isauthorized', verifyToken, isAuthorized);

module.exports = router;
