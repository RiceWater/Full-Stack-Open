require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./controlllers/blog')
const errorHandler = require('./utils/logger')
const app = express()
const { mongoUrl, port } = require('./utils/config')

mongoose.connect(mongoUrl, { family: 4, dbName: "blogList" })
.then(_ => {
    console.log("Connected")
})
.catch(error => {
    console.log(`ERROR: ${error}`)
})

app.use(express.json())
app.get('/api/blogs', blogRouter)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})