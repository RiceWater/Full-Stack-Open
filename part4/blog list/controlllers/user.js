const userRouter = require('express').Router()
const User = require('./../models/users')
const bcrypt = require('bcrypt')
const Blog = require('./../models/blogs')
userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  return response.json(users)
})

userRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    if (body.username === null || body.username === "") {
      return response.status(400).json("Invalid request")
    }
    if (body.password.length < 3) {
      return response.status(400).json({ error: "Password is too short"})
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(body.password, salt)
    const blogs = await Blog.find({})
    const newUser = new User({
      ...body,
      password: hashedPassword,
      blogs: blogs.length === 0 ? [] : blogs.map(e => e.id)
    })  

    const result = await newUser.save()
    return response.json(result)
  } catch (err) {
    return response.status(400).json({ error: err})
  }
}) 


module.exports = userRouter 