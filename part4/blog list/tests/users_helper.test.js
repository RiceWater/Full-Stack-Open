const User = require('./../models/blogs')

const sampleUserData = [
  {
    "username": "User1",
    "password": "Pass1",
    "name": "Jake"
  },
  {
    "username": "User2",
    "password": "Pass2",
    "name": "Jake2"
  }
]

const usersInDB = async () => {
  return await User.find({})
}

module.exports = { sampleUserData, usersInDB }

