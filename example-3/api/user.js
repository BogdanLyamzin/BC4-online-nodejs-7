const express = require('express')
const bcrypt = require("bcryptjs")
const router = express.Router()

const {User} = require("../models");

router.post('/registration', async (req, res, next) => {
    const { login, email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
        return res.status(409).json({
            status: 'error',
            code: 409,
            message: 'Email is already in use',
            data: 'Conflict',
        })
    }
    try {
        // const cryptPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(6));
        // const newUser = new User({ login, email, password: cryptPassword })
        const newUser = new User({ login, email})
        newUser.setPassword(password)
        const result = await newUser.save()
        res.status(201).json({
            status: 'success',
            code: 201,
            data: {
                user: result
            },
        })
    } catch (error) {
        next(error)
    }
})

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    // "/users/:id"
    // const cryptPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(6));

    if (!user || !user.validPassword(password)) {
        return res.status(400).json({
            status: 'error',
            code: 400,
            message: 'Incorrect login or password',
            data: 'Bad request',
        })
    }

    res.json({
        status: 'success',
        code: 200,
    })
})

router.get("/profile", (req, res, next)=> {
    
})

module.exports = router
