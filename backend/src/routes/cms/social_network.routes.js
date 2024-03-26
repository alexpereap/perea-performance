const express = require('express');
const SocialNetwork = require('../../controllers/cms/social_network.controller');

const router = new express.Router();

// get single social network
router.get('/get/:socialNetWorkId', SocialNetwork.getOne);

// get all social networks
router.get('/getAll', SocialNetwork.getAll);

// insert social network
router.post('/insert', SocialNetwork.insert);

// update social network
router.patch('/update/:socialNetWorkId', SocialNetwork.update);

// delete social network
router.delete('/delete/:socialNetWorkId', SocialNetwork.deleteRecord);

module.exports = router;
