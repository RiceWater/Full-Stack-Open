const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./controlllers/blog')
const userRouter = require('./controlllers/user')
const errorHandler = require('./utils/logger')
const app = express()
const mongoUrl = require('./utils/config').mongoUrl

mongoose.connect(mongoUrl, { family: 4 })
.then(_ => {
    console.log("Connected")
})
.catch(error => {
    console.log(`ERROR: ${error}`)
})

app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use(errorHandler)

module.exports = app