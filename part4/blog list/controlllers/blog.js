const blogRouter = require('express').Router()
const { default: mongoose } = require('mongoose')
const Blog = require('../models/blogs')
const User = require('./../models/users')

blogRouter.get('/', async (_, response) => {
  const blogs = await Blog.find({}).populate('user')
  return response.json(blogs)
})

blogRouter.post('/', async (request, response) => {

  const user = await User.find({})
  const blog = new Blog({
    ...request.body, 
    user: user.length === 0 ? null : new mongoose.Types.ObjectId(user[0].id)
  })
  const result = await blog.save()
  return response.status(201).json(result)  
}) 

blogRouter.delete('/:id', async (request, response) => {
  const result = await Blog.findByIdAndDelete(request.params.id)
  return response.json(result)
})

blogRouter.put('/:id', async (request, response) => {
  const result = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
  return response.json(result)
})

module.exports = blogRouter