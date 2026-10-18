const app = require('./../app')
const supertest = require('supertest')
const { describe, test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const User = require('./../models/users')
const { sampleUserData, usersInDB } = require('./users_helper.test')
const mongoose = require('mongoose')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  let user = new User(sampleUserData[0])
  await user.save()
  user = new User(sampleUserData[1])
  await user.save()
})

describe('GET users', () => {

  test('will return status 200', async () => {
    await api.get('/api/users')
    .expect(200)
  })

  test('will return all users in the database', async () => {
    const response = await api.get('/api/users')
    assert.strictEqual(2, response.body.length)
  })
})

describe('POST users', () => {
  
  test('adding a user with an existing username will throw an error', async () => {
    await api.post('/api/users', {
      'username': sampleUserData[0].username,
      'password': '12121',
      'name': 'asdasd'
    })
    .expect(400)
  })

  test('adding a user whose username is less than 3 will throw an error', async () => {
    await api.post('/api/users', {
      'username': 'du',
      'password': '12asd',
      'name': 'asdasd'
    })
    .expect(400)
  })

  test('adding a user whose password is less than 3 will throw an error', async () => {
    await api.post('/api/users', {
      'username': 'dummyUsername',
      'password': '12',
      'name': 'asdasd'
    })
    .expect(400)
  })
})

after(async () => {
  await User.deleteMany({})
  mongoose.connection.close()
})