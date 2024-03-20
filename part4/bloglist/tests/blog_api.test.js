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

test.only('should respond with status code 400 if title is missing', async () => {
  const blog = mocData.blogWithuotTitleProperty

  const response = await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)

  assert.strictEqual(response.body.error, 'Bad Request: Missing title')
})

test.only('should respond with status code 400 if url is missing', async () => {
  const blog = mocData.blogWithuotUrlProperty

  const response = await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)

  assert.strictEqual(response.body.error, 'Bad Request: Missing url')
})

after(async () => {
  await mongoose.connection.close()
})