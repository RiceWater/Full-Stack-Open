require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
})

blogSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = doc._id
        delete ret.__v
        delete ret._id
    }
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGODB_URL
mongoose.connect(mongoUrl, { family: 4, dbName: "blogList" })
.then(_ => {
    console.log("Connected")
})
.catch(error => {
    console.log(`ERROR: ${error}`)
})

app.use(express.json())

app.get('/api/blogs', (_, response, next) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
  .catch(error => next(error))
})

app.post('/api/blogs', (request, response, next) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
  .catch(error => next(error))
})

const errorHandler = (error, _, response, next) => {
    if (error.name === 'CastError') {
        response.status(400).send({ message: "cast error"})
    } else if (error.name === 'ValidationError') {
        response.status(400).json({ message: error })
    }
    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})