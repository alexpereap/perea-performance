const express = require('express');
const Car = require('../../controllers/cms/car.controller');

const router = new express.Router();

// get single car
router.get('/get/:carId', Car.getOne);

// get all cars
router.get('/getAll', Car.getAll);

// insert car
router.post('/insert', Car.insert);

// update car
router.patch('/update/:carId', Car.update);

// delete car
router.delete('/delete/:carId', Car.deleteRecord);

module.exports = router;
