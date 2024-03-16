const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { sequelize, DataTypes } = require('../db')
const UserModel = require('../models/user')(sequelize, DataTypes)

const login = async (req, res) => {

    try {
        const {username, password} = req.body
        const user = await UserModel.findOne({
            where: {
                username
            }
        })

        if (user === null || !await bcrypt.compare(password, user.password)) {
            return authFailed(res)
        }

        res.send(`User found ${user.id}`)
        // TODO login flow

    } catch (e) {
        return authFailed(res, e.message)
    }
}

const register = async (req, res) => {
    // TODO SAFEGUARD this route
    try {
        const {username, password} = req.body

        // checks required fields
        if (
            username == undefined
            || username == ''
            || password == undefined
            || password == ''
        ) {
            return res.status(403).json({
                message: 'username and password fields are required'
            })
        }

        // checks username doesn exist
        let user = await UserModel.findOne({
            where: {
                username
            }
        })

        if (user !== null) {
            return res.status(403).json({
                message: 'username already exists'
            })
        }

        // hash gen
        const hash = await bcrypt.hash(password, 10)
        // creates user
        user = await UserModel.create({
            username,
            password: hash
        })

        return res.status(201).json({
            message: `User created ID: ${user.id}`,
            success: true

        })

    } catch (e) {
        return res.status(500).json({
            message: 'An unexpected error occurred',
            error: e.message
        })
    }
}

function authFailed(res, error) {
    let response = {
        message: 'Authentication Failed',
    }

    if (error) {
        response.error = error
    }

    return res.status(401).json(response)
}

module.exports = {
    login,
    register
}