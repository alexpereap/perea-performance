const express = require('express');
const homeSlides = require('../../controllers/cms/home_slides.controller');

const router = new express.Router();

// get all home slides
router.get('/getAll', homeSlides.getAll);

// insert one home slide
router.post('/add', homeSlides.insert);

// update one home slide
router.post('/update/:homeSlideId', homeSlides.update);

module.exports = router;
