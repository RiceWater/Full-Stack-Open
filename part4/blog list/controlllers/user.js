const userRouter = require('express').Router()
const User = require('./../models/users')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  return response.json(users)
})

userRouter.post('/', async (request, response) => {
  const body = request.body
  if (body.username === null || body.username === "") {
    return response.status(400).send("Invalid request")
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(body.password, salt)
  const newUser = new User({
    username: body.username,
    password: hashedPassword,
    name: body.name
  })  

  const result = await newUser.save()
  return response.json(result)
}) 


module.exports = userRouter 