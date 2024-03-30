const express = require('express');

const router = express.Router();

const dashboardController = require('../controllers/cms/dashboard.controller');
const homeSlidesController = require('../controllers/cms/home_slides.controller');

// dashboard routes
router.get(['/', '/dashboard'], dashboardController.dashboard);
router.get('/sign-out', dashboardController.signOut);
// end of dashboard routes

// home slides routes

router.get('/home-slides', homeSlidesController.list);

// end of home slides routes

module.exports = router;
