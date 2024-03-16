const express = require('express')
const router = new express.Router()

const { login, test } = require('../controllers/auth.controller')
const verifyToken = require('../middlewares/auth.middleware')

router.post('/login', login)

module.exports = router