const blogListRouter = require('express').Router()
const Blog = require('../models/blog')

blogListRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)
    } catch (error) {
        next(error)
    }
})

blogListRouter.post('/', async (request, response, next) => {
    try {
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
            likes: request.body.likes ? request.body.likes : 0
        })

        const result = await blog.save()
        response.status(201).json(result)
    } catch (error) {
        next(error)
    }
})

blogListRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (error) {
        next(error)
    }
})

module.exports = blogListRouter