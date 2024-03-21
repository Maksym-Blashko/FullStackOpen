const { test, after, beforeEach, describe } = require('node:test')
const Blog = require('../models/blog')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const mocData = require('../utils/moc_data')

const api = supertest(app)

describe('API tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(mocData.listWithTwoBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are reterned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, mocData.listWithTwoBlogs.length)
  })

  test('the unique identifier property of the blog posts is named "id"', async () => {
    const blog = new Blog(mocData.listWithOneBlog[0])
    const jsonBlog = blog.toJSON()
    assert.ok(jsonBlog.hasOwnProperty('id'), 'Property "id" not found')
  })

  test('should create a new blog post', async () => {
    const blog = mocData.listWithOneBlog[0]

    const response = await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)

    const createdBlog = await Blog.findById(response.body.id)
    assert.ok(createdBlog, 'Blog post not found in the database')

    assert.strictEqual(createdBlog.title, blog.title)
    assert.strictEqual(createdBlog.author, blog.author)

    const totalBlogs = await Blog.countDocuments()
    assert.strictEqual(totalBlogs, mocData.listWithTwoBlogs.length + 1)
  })

  test('should set default value of likes to 0 if not provided', async () => {
    const blog = mocData.blogWithuotLikesProperty

    const response = await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)

    assert.strictEqual(response.body.likes, 0, 'Default value of likes should be 0')
  })

  test('should respond with status code 400 if title is missing', async () => {
    const blog = mocData.blogWithuotTitleProperty

    const response = await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)

    assert.strictEqual(response.body.error, 'Bad Request: Missing title')
  })

  test('should respond with status code 400 if url is missing', async () => {
    const blog = mocData.blogWithuotUrlProperty

    const response = await api
      .post('/api/blogs')
      .send(blog)
      .expect(400)

    assert.strictEqual(response.body.error, 'Bad Request: Missing url')
  })
})

test.only('should delete a blog post', async () => {
  const blog = mocData.listWithTwoBlogs[0]

  await api
  .delete(`/api/blogs/${blog._id}`)
  .expect(204)

  const totalBlogs = await Blog.countDocuments()
  assert.strictEqual(totalBlogs, mocData.listWithTwoBlogs.length - 1)  
})

after(async () => {
  await mongoose.connection.close()
})