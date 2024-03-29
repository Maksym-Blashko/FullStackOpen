const { test, after, beforeEach, describe } = require('node:test')
const Blog = require('../models/blog')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const mocData = require('./test_moc_data')

const api = supertest(app)

describe('API tests Blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(mocData.blogsData.listWithTwoBlogs)
  })

  describe('GET /api/blogs', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all blogs are reterned', async () => {
      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, mocData.blogsData.listWithTwoBlogs.length)
    })
  })

  describe('Blog post properties', () => {
    test('the unique identifier property of the blog posts is named "id"', async () => {
      const blog = new Blog(mocData.blogsData.listWithOneBlog[0])
      const jsonBlog = blog.toJSON()
      assert.ok(jsonBlog.hasOwnProperty('id'), 'Property "id" not found')
    })
  })

  describe('POST /api/blogs', () => {
    test('should create a new blog post', async () => {
      const blog = mocData.blogsData.listWithOneBlog[0]

      const response = await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)

      const createdBlog = await Blog.findById(response.body.id)
      assert.ok(createdBlog, 'Blog post not found in the database')

      assert.strictEqual(createdBlog.title, blog.title)
      assert.strictEqual(createdBlog.author, blog.author)

      const totalBlogs = await Blog.countDocuments()
      assert.strictEqual(totalBlogs, mocData.blogsData.listWithTwoBlogs.length + 1)
    })

    test('should set default value of likes to 0 if not provided', async () => {
      const blog = mocData.blogsData.blogWithuotLikesProperty

      const response = await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)

      assert.strictEqual(response.body.likes, 0, 'Default value of likes should be 0')
    })

    test('should respond with status code 400 if title is missing', async () => {
      const blog = mocData.blogsData.blogWithuotTitleProperty

      const response = await api
        .post('/api/blogs')
        .send(blog)
        .expect(400)

      assert.strictEqual(response.body.error, 'Bad Request: Missing title')
    })

    test('should respond with status code 400 if url is missing', async () => {
      const blog = mocData.blogsData.blogWithuotUrlProperty

      const response = await api
        .post('/api/blogs')
        .send(blog)
        .expect(400)

      assert.strictEqual(response.body.error, 'Bad Request: Missing url')
    })
  })

  describe('DELETE /api/blogs/:id', () => {
    test('should delete a blog post', async () => {
      const blog = mocData.blogsData.listWithTwoBlogs[0]

      await api
        .delete(`/api/blogs/${blog._id}`)
        .expect(204)

      const totalBlogs = await Blog.countDocuments()
      assert.strictEqual(totalBlogs, mocData.blogsData.listWithTwoBlogs.length - 1)
    })
  })

  describe('PUT /api/blogs/:id', () => {
    test('should update the number of likes for a blog post', async () => {
      const blogToUpdate = mocData.blogsData.listWithTwoBlogs[0]
      const updatedLikes = blogToUpdate.likes + 1

      const blog = {
        title: blogToUpdate.title,
        author: blogToUpdate.author,
        url: blogToUpdate.url,
        likes: updatedLikes
      }

      const response = await api
        .put(`/api/blogs/${blogToUpdate._id}`)
        .send(blog)
        .expect(200)

      assert.strictEqual(response.body.likes, updatedLikes)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})