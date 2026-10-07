const blogRouter = require('express').Router()
const Blog = require('../models/blogs')
const mongoose = require('mongoose')

blogRouter.get('/', async (_, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  return response.status(201).json(result)  
}) 

blogRouter.delete('/:id', async (request, response) => {
  if (request.params.id === undefined) {
    return response.status(401).end()
  }
  const result = await Blog.findByIdAndDelete(request.params.id)
  return response.json(result)
})

module.exports = blogRouter