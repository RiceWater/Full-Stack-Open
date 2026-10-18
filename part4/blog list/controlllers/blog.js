const blogRouter = require('express').Router()
const Blog = require('../models/blogs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

blogRouter.get('/', async (_, response) => {
  const blogs = await Blog.find({}).populate('user')
  return response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  
  if (request.token === undefined || request.token.length === 0) {
    return response.status(400).json({ error: "Missing bearer token"} )
  }
  const userObj = jwt.verify(request.token, process.env.JWT_SECRET)
  const blog = new Blog({
    ...request.body, 
    user: userObj.id
  })
  const result = await blog.save()
  return response.status(201).json(result)  
}) 

blogRouter.delete('/:id', async (request, response) => {
  const token = request.token
  if (request.token === undefined || request.token.length === 0) {
    return response.status(400).json({ error: "Missing bearer token"} )
  }

  const decodedToken = jwt.decode(token, process.env.JWT_SECRET)
  const blog = await Blog.findById(request.params.id)
  if (blog.user?.toString() === decodedToken.id) {
    const deletedBlog = await blog?.deleteOne()
    return response.json({ ...deletedBlog, blog: blog })
  }
  return response.status(400).json({ error: "You do not have permission to delete this blog" })
})

blogRouter.put('/:id', async (request, response) => {
  const result = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
  return response.json(result)
})

module.exports = blogRouter