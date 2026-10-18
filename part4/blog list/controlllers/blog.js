const blogRouter = require('express').Router()
const Blog = require('../models/blogs')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (_, response) => {
  const blogs = await Blog.find({}).populate('user')
  return response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const bearerToken = request.get('authorization')
  const cleanToken = bearerToken?.startsWith('Bearer') 
    ? bearerToken.replace('Bearer ', '') 
    : bearerToken
  if (cleanToken === null || cleanToken.length === 0) {
    return response.status(400).json({ error: "Missing bearer token"} )
  }
  const userObj = jwt.verify(cleanToken, process.env.JWT_SECRET)
  const blog = new Blog({
    ...request.body, 
    user: userObj.id
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