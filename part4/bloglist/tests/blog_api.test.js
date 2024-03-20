const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const mocData = require('../utils/moc_data')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  
  let blog = new Blog(mocData.listWithTwoBlogs[0])
  await blog.save()
  
  blog = new Blog(mocData.listWithTwoBlogs[1])
  await blog.save()
})

test('there are two blogs as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, 2)
})

test.only('the unique identifier property of the blog posts is named "id"', async () => {
  const blog = new Blog(mocData.listWithOneBlog[0])
  const jsonBlog = blog.toJSON()
  assert.ok(jsonBlog.hasOwnProperty('id'), 'Property "id" not found')
})

after(async () => {
  await mongoose.connection.close()
})