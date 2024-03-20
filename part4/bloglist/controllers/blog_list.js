const blogListRouter = require('express').Router()
const Blog = require('../models/blog')

blogListRouter.get('/', (request, response, next) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
        .catch(error => next(error))
})

blogListRouter.post('/', (request, response, next) => {
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

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(error => next(error))
})

module.exports = blogListRouter