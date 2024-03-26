const express = require('express');
const Service = require('../../controllers/cms/service.controller');

const router = new express.Router();

// get single service
router.get('/get/:serviceId', Service.getOne);

// get all services
router.get('/getAll', Service.getAll);

// insert service
router.post('/insert', Service.insert);

// update service
router.patch('/update/:serviceId', Service.update);

// delete service
router.delete('/delete/:serviceId', Service.deleteRecord);

module.exports = router;
