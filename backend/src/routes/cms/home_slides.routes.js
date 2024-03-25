const express = require('express');
const homeSlides = require('../../controllers/cms/home_slides.controller');

const router = new express.Router();

// get one home slide
router.get('/get/:homeSlideId', homeSlides.getOne);

// get all home slides
router.get('/getAll', homeSlides.getAll);

// insert one home slide
router.post('/add', homeSlides.insert);

// update one home slide
router.patch('/update/:homeSlideId', homeSlides.update);

// delete one home slide
router.delete('/delete/:homeSlideId', homeSlides.deleteRecord);

module.exports = router;
