const express = require('express');

const router = express.Router();

const { dashboard } = require('../controllers/cms/dashboard.controller');
const homeSlidesController = require('../controllers/cms/home_slides.controller');

// dashboard routes
router.get(['/', '/dashboard'], dashboard);
// end of dashboard routes

// home slides routes

router.get('/home-slides', homeSlidesController.list);

// end of home slides routes

module.exports = router;
