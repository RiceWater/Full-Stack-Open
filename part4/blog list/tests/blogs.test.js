const { test, describe, beforeEach, after } = require('node:test')
const app = require('./../app')
const supertest = require('supertest')
const assert = require('node:assert')
const Blog = require('./../models/blogs')
const mongoose = require('mongoose')

const { sampleBlogData, blogsInDB } = require('./blogs_helper.test')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  let one = new Blog(sampleBlogData[0])
  await one.save()
  let two = new Blog(sampleBlogData[1])
  await two.save()
})

describe('get /api/blogs from a database', () => {
  
  test('will return correct headers', async () => {
    await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  })
  
  test('will return all blogs', async () => {
    const response = await api.get('/api/blogs')
    const blogCount = await blogsInDB()
    assert.strictEqual(response.body.length, blogCount.length)
  })

  test('will return a certain blog', async () => {
    const response = await api.get('/api/blogs')
    const content = response.body.map(blog => blog.title)
    assert.strictEqual(content.includes('One'), true)
  })
})

after(async () => {
  await Blog.deleteMany({})
  mongoose.connection.close()
})
