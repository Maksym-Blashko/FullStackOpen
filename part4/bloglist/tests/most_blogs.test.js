const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const mocData = require('../utils/moc_data')

describe('most blogs', () => {
    const emptyArray = []
    const listWithOneBlog = mocData.listWithOneBlog
    const manyBlogs = mocData.blogs

    const mostBlogsFromManyBlogs = mocData.mostBlogsFromManyBlogs
    const mostBlogsFromOneBlog = mocData.mostBlogsFromOneBlog

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