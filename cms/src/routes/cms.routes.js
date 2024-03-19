const express = require('express');

const router = express.Router();

const { home, login } = require('../controllers/main.controller');

router.get('/', home);
router.post('/login', login);

module.exports = router;
