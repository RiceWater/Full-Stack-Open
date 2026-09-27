const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./controlllers/blog')
const errorHandler = require('./utils/logger')
const { mongoUrl, _ } = require('./utils/config')
const app = express()

mongoose.connect(mongoUrl, { family: 4, dbName: "blogList" })
.then(_ => {
    console.log("Connected")
})
.catch(error => {
    console.log(`ERROR: ${error}`)
})

app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use(errorHandler)

module.exports = app