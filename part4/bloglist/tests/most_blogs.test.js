const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const mocData = require('./test_moc_data')

describe('most blogs', () => {
    const emptyArray = []
    const listWithOneBlog = mocData.blogsData.listWithOneBlog
    const manyBlogs = mocData.blogsData.blogs

    const mostBlogsFromManyBlogs = mocData.blogsData.mostBlogsFromManyBlogs
    const mostBlogsFromOneBlog = mocData.blogsData.mostBlogsFromOneBlog

    test('of empty list is returned null', () => {
        const result = listHelper.mostBlogs(emptyArray)
        assert.deepStrictEqual(result, null)
    })

    test('when list has only one blog is returned right', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        assert.deepStrictEqual(result, mostBlogsFromOneBlog)
    })

    test('of a bigger list is returned right', () => {
        const result = listHelper.mostBlogs(manyBlogs)
        assert.deepStrictEqual(result, mostBlogsFromManyBlogs)
    })
})