const blogListRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogListRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
        response.json(blogs)
    } catch (error) {
        next(error)
    }
})

blogListRouter.post('/', async (request, response, next) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'Unauthorized: Invalid token' })
        }

        const user = request.user
        if (!user) {
            return response.status(401).json({ error: 'Unauthorized: User not found' })
        }

        if (request.body.title === undefined) {
            return response.status(400).json({ error: 'Bad Request: Missing title' })
        }
        if (request.body.url === undefined) {
            return response.status(400).json({ error: 'Bad Request: Missing url' })
        }

        const blog = new Blog({
            title: request.body.title,
            author: request.body.author,
            url: request.body.url,
            likes: request.body.likes ? request.body.likes : 0,
            user: user.id
        })

        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(savedBlog)
    } catch (error) {
        next(error)
    }
})

blogListRouter.delete('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)

        if (!blog) {
            return response.status(404).json({ error: 'Blog not found' })
        }

        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'Token missing or invalid' })
        }

        const user = request.user
        if (!user || !blog.user || blog.user.toString() !== user.id) {
            return response.status(403).json({ error: 'You are not authorized to delete this blog' })
        }

        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (error) {
        next(error)
    }
})

blogListRouter.put('/:id', async (request, response, next) => {
    const blog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes ? request.body.likes : 0
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.json(updatedBlog)
    } catch (error) {
        next(error)
    }
})

module.exports = blogListRouter