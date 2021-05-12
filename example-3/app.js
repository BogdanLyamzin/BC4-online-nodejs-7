const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const {userRouter} = require('./api')

require('dotenv').config()

const {DB_HOST} = process.env;

const app = express()

app.use(express.json())

app.use(cors())

app.use('/api', userRouter)

app.use((_, res, __) => {
    res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not such route`,
        data: 'Not found',
    })
})

app.use((err, _, res, __) => {
    console.log(err.stack)
    res.status(500).json({
        status: 'fail',
        code: 500,
        message: err.message,
        data: 'Internal Server Error',
    })
})

mongoose.connect(DB_HOST, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(()=> {
    const PORT = process.env.PORT || 3000

    app.listen(PORT)
})
//
//
//
