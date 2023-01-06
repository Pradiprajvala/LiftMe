const mongoose = require('mongoose')
const dotenv = require('dotenv')
const express = require('express')
dotenv.config({path: './config.env'})
const app = express()
const cookieParser = require('cookie-parser')
app.use(cookieParser())

require('./db/connection')

// const User = require('./model/userSchema')
const PORT = process.env.PORT || 5000
app.use(express.json())

app.use(require('./router/auth'))

app.use(require('./router/postCar'))

app.use(require('./router/getCars'))

app.use(require('./router/getCurrentUser'))

app.use(require('./router/sendLiftRequest'))

app.use(require('./router/getRequests'))

app.use(require('./router/acceptRequest'))

app.use(require('./router/getMyProfile'))

app.use(require('./router/getMyCars'))

app.use(require('./router/getUserProfile'))

app.use(require('./router/postLikeDislike'))

app.use(require('./router/updateProfile'))

// app.get('/', (req,res) => {
//     res.send('hello')
// })

if(process.env.NODE_ENV == "production"){
    console.log('production')
    app.use(express.static("client/build"))
}

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}` );
})

