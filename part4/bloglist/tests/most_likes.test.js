const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const mocData = require('./test_moc_data')

describe('most likes', () => {
    const emptyArray = []
    const listWithOneBlog = mocData.blogsData.listWithOneBlog
    const manyBlogs = mocData.blogsData.blogs

    const mostLikesFromManyBlogs = mocData.blogsData.mostLikesFromManyBlogs
    const mostLikesFromOneBlog = mocData.blogsData.mostLikesFromOneBlog

    test('of empty list is returned null', () => {
        const result = listHelper.mostLikes(emptyArray)
        assert.deepStrictEqual(result, null)
    })

    test('when list has only one blog is returned right', () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        assert.deepStrictEqual(result, mostLikesFromOneBlog)
    })

    test('of a bigger list is returned right', () => {
        const result = listHelper.mostLikes(manyBlogs)
        assert.deepStrictEqual(result, mostLikesFromManyBlogs)
    })
})