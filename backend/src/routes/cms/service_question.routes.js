const express = require('express');
const ServiceQuestion = require('../../controllers/cms/service_question.controller');

const router = new express.Router();

// get single service question
router.get('/get/:serviceQuestionId', ServiceQuestion.getOne);

// get all service questions for a specific service
router.get('/getAll/:serviceId', ServiceQuestion.getAll);

// insert service question
router.post('/insert', ServiceQuestion.insert);

// updates service question
router.patch('/update/:serviceQuestionId', ServiceQuestion.update);

// deletes service question
router.delete('/delete/:serviceQuestionId', ServiceQuestion.deleteRecord);

module.exports = router;
