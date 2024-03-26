const express = require('express');
const SinglePage = require('../../controllers/cms/singe_page.controller');

const router = new express.Router();

// get single page
router.get('/get/:singlePageId', SinglePage.getOne);

// get all single pages
router.get('/getAll', SinglePage.getAll);

// insert single page
router.post('/add', SinglePage.insert);

// updates single page
router.patch('/update/:singlePageId', SinglePage.update);

// delete single page
router.delete('/delete/:singlePageId', SinglePage.deleteRecord);

module.exports = router;
