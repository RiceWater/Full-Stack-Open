require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./controlllers/blog')
const errorHandler = require('./utils/logger')
const app = express()


const mongoUrl = process.env.MONGODB_URL
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

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})