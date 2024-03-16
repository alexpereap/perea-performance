const express = require('express')
const router = new express.Router()

const { login, register } = require('../controllers/auth.controller')
const verifyToken = require('../middlewares/auth.middleware')

router.post('/login', login)
router.post('/register', register)

module.exports = router