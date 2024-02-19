const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

app.use(cors())
// app.use(express.static('static_dist'))
app.use(express.json())

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.set('strictQuery', false)
mongoose.connect(url)
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB:', error.message))

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))