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
router.get('/home-slides/add', homeSlidesController.add);
router.post('/home-slides/add', homeSlidesController.postAdd);
router.get('/home-slides/edit/:slideId', homeSlidesController.edit);
router.post('/home-slides/edit/:slideId', homeSlidesController.update);
router.get('/home-slides/delete/:slideId', homeSlidesController.deleteRecord);

// end of home slides routes

module.exports = router;
