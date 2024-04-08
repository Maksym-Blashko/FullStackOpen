const { test, after, beforeEach, describe } = require('node:test')
const Blog = require('../models/blog')
const User = require('../models/user')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mocData = require('./test_moc_data')

const api = supertest(app)
let token

const getTokenFrom = async () => {
  const user = await User.findOne({ username: 'root' })
  if (!user) {
    throw new Error('User "root" not found')
  }
  const token = jwt.sign({ username: user.username, id: user._id }, process.env.SECRET)
  return token
}

// Blog tests
describe('API tests Blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salainen', 10)
    const testUser = new User({
      username: 'root',
      name: 'Test User',
      passwordHash,
    })

    await testUser.save()
    token = await getTokenFrom()

    const initBlogs = mocData.blogsData.listWithTwoBlogs
    initBlogs[0].user = testUser._id
    await Blog.insertMany(initBlogs)
  })

  describe('GET /api/blogs', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all blogs are reterned', async () => {
      const response = await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${token}`)

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
        .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', `Bearer ${token}`)
        .send(blog)
        .expect(201)

      assert.strictEqual(response.body.likes, 0, 'Default value of likes should be 0')
    })

    test('should respond with status code 400 if title is missing', async () => {
      const blog = mocData.blogsData.blogWithuotTitleProperty

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blog)
        .expect(400)

      assert.strictEqual(response.body.error, 'Bad Request: Missing title')
    })

    test('should respond with status code 400 if url is missing', async () => {
      const blog = mocData.blogsData.blogWithuotUrlProperty

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blog)
        .expect(400)

      assert.strictEqual(response.body.error, 'Bad Request: Missing url')
    })

    test('should return 401 if token is not provided', async () => {
      const blog = mocData.blogsData.listWithOneBlog[0]

      const response = await api
        .post('/api/blogs')
        .send(blog)
        .expect(401)

      assert.strictEqual(response.body.error, 'token missing or invalid')
    })
  })

  describe('DELETE /api/blogs/:id', () => {
    test('should delete a blog post', async () => {
      const blog = mocData.blogsData.listWithTwoBlogs[0]
      const user = await User.findOne({ username: 'root' })
      blog.user = user._id

      await api
        .delete(`/api/blogs/${blog._id}`)
        .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', `Bearer ${token}`)
        .send(blog)
        .expect(200)

      assert.strictEqual(response.body.likes, updatedLikes)
    })
  })
})

// User tests
describe('API tests User', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salainen', 10)
    const testUser = new User({
      username: 'root',
      name: 'Test User',
      passwordHash,
    })

    await testUser.save()
    token = await getTokenFrom()
  })

  describe('POST /api/users', () => {
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await User.find({})

      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await User.find({})
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
    })

    test('missing data returns appropriate error message', async () => {
      const newUser = mocData.invalidUserData.emptyData

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert(response.body.error === 'Username and password are required')
    })

    test('empty username returns appropriate error message', async () => {
      const newUser = mocData.invalidUserData.emptyUsername

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert(response.body.error === 'Username and password are required')
    })

    test('empty password returns appropriate error message', async () => {
      const newUser = mocData.invalidUserData.emptyPassword

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert(response.body.error === 'Username and password are required')
    })

    test('short username returns appropriate error message', async () => {
      const newUser = mocData.invalidUserData.shortUsername

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert(response.body.error === 'Username and password must be at least 3 characters long')
    })

    test('short password returns appropriate error message', async () => {
      const newUser = mocData.invalidUserData.shortPassword

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert(response.body.error === 'Username and password must be at least 3 characters long')
    })

    test('username must be unique', async () => {
      const newUser = mocData.invalidUserData.duplicateUsername

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})