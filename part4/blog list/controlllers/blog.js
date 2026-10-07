const blogRouter = require('express').Router()
const Blog = require('../models/blogs')

blogRouter.get('/', async (_, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  return response.status(201).json(result)  
})

module.exports = blogRouter