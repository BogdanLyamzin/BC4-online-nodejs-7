const express = require('express')
const bcrypt = require("bcryptjs")
const passport = require("passport");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router()

const {User} = require("../models");
/* 
1. Извлечь токен из запроса
2. проверить токен на подлинность
3. найти пользователя в базе
*/
// -> если нашли - добавить его объект к запросу и передать управление основной функции-обработчику
const auth = (req, res, next)=> {
    passport.authenticate("jwt", {session: false}, (err, user)=> {
        if(!user || err) {
            return res.status(401).json({
                status: "error",
                code: 401,
                message: "You have no provileg"
            });
        }
        req.user = user;
        next()
    })
}
// users?page=3&limit=10
router.get("users", async (req, res, next)=> {
    const {page, limit} = req.query;
    const skip = limit*(page - 1);
    try{
        const users = await User.find({}, {skip, limit});
    }
    catch(error){
        next(error);
    }
})

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

    if (!user || !user.validPassword(password)) {
        return res.status(400).json({
            status: 'error',
            code: 400,
            message: 'Incorrect login or password',
            data: 'Bad request',
        })
    }

    const payload = {
        id: user._id
    };
    const {SECRET_KEY} = process.env;
    // user.token = token;
    // user.save();
    // user.token = null;
    // user.save()

    // global.tokenList.push(token)
    // const result = global.tokenList.find(token => userToken)

    // Redis
    // 
    const token = jwt.sign(payload, SECRET_KEY); // jwt.sign по умолчанию добавляет стандартный header вида {"alg": "HS256", "typ": "JWT"}
    res.cookie("nToken", token);
    res.json({
        status: 'success',
        code: 200,
        data: {
            token
        }
    })
})

router.post('/logout', (req, res, next)=>{
    res.clearCookie("nToken")
})

router.get("/orders", auth, async (req, res, next)=> {
  const {id} = req.user;
    try {
        const orders = await Orders.find({_id: id});
        res.json({
            status: "success",
            code: 200,
            data: {
                result: orders
            }
        });
    }
    catch(error){
        next(error);
    }
})

module.exports = router
