const mongoose = require('mongoose')

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
    required: false,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id.toString()
    delete ret.__v
    delete ret._id
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog