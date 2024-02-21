const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {

    if (blogs.length === 0) { return null }

    const blogWithMostLikes = blogs.reduce((maxLikesBlog, blog) => {
        return blog.likes > maxLikesBlog.likes ? blog : maxLikesBlog;
    }, blogs[0])

    const favoriteBlog = {
        title: blogWithMostLikes.title,
        author: blogWithMostLikes.author,
        likes: blogWithMostLikes.likes
    }

    return favoriteBlog
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}