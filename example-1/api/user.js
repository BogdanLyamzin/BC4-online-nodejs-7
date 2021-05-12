const express = require('express');
const router = express.Router();

const {User} = require("../models");

router.post('/registration', async (req, res, next) => {
    const { login, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(409).json({
            status: 'error',
            code: 409,
            message: 'Email is already in use',
            data: 'Conflict',
        })
    }
    try {
        const newUser = new User({ login, email, password });
        const result = await newUser.save();
        res.status(201).json({
            status: 'success',
            code: 201,
            data: {
                user: result
            },
        })
    } catch (error) {
        next(error);
    }
})

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user || !user.password === password) {
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
        data: {
            token,
        },
    })
})

module.exports = router
