const express = require('express');

const router = express.Router();

// controllers
const { home, login } = require('../controllers/main.controller');

// main controller routes
router.get('/', home);
router.post('/login', login);

module.exports = router;
