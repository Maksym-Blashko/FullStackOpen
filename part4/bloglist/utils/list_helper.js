const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) { return null }

    const blogWithMostLikes = blogs.reduce((maxLikesBlog, blog) => {
        return blog.likes > maxLikesBlog.likes ? blog : maxLikesBlog
    }, blogs[0])

    const favoriteBlog = {
        title: blogWithMostLikes.title,
        author: blogWithMostLikes.author,
        likes: blogWithMostLikes.likes
    }

    return favoriteBlog
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) { return null }

    const blogsByAuthor = _.groupBy(blogs, 'author')
    const authorWithMostBlogs = _.maxBy(_.keys(blogsByAuthor), author => blogsByAuthor[author].length)
    const numberOfBlogs = blogsByAuthor[authorWithMostBlogs].length

    const mostBlogs = {
        author: authorWithMostBlogs,
        blogs: numberOfBlogs
    }

    return mostBlogs
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) { return null }

    const blogsByAuthor = _.groupBy(blogs, 'author')
    const totalLikesByAuthor = _.mapValues(blogsByAuthor, blogs => _.sumBy(blogs, 'likes'))
    const authorWithMaxLikes = _.maxBy(_.keys(totalLikesByAuthor), author => totalLikesByAuthor[author])
    const totalLikesOfAuthorWithMaxLikes = totalLikesByAuthor[authorWithMaxLikes]

    const mostLikes = {
        author: authorWithMaxLikes,
        likes: totalLikesOfAuthorWithMaxLikes
    }

    return mostLikes
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}