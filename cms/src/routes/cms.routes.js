const express = require('express');

const router = express.Router();

// controllers
const { home, login } = require('../controllers/main.controller');
const { dashboard } = require('../controllers/dashboard.controller');

// middlewares
const backendAuth = require('../middlewares/backend.auth.middleware');

// main controller routes
router.get('/', home);
router.post('/login', login);

// dashboard routes
router.get('/dashboard', backendAuth, dashboard);

module.exports = router;
