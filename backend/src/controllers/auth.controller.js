const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const UserModel = require('../models/user')

const login = async (req, res) => {

    try {
        console.log(req.body)
        const {username, password} = req.body
        console.log(username, password)
        res.send('login works')
    } catch (e) {
        res.send(e.message)
    }
    
}

module.exports = {
    login
}