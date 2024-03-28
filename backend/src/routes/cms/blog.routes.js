const express = require('express');
const Blog = require('../../controllers/cms/blog.controller');

const router = new express.Router();

// get blog entry
router.get('/get/:blogId', Blog.getOne);

// get all blog entries
router.get('/getAll', Blog.getAll);

// insert blog
router.post('/insert', Blog.insert);

// update
router.patch('/update/:blogId', Blog.update);

// delete
router.delete('/delete/:blogId', Blog.deleteRecord);

module.exports = router;
