const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const mocData = require('../utils/moc_data')

describe('total likes', () => {
    const emptyArray = []
    const listWithOneBlog = mocData.listWithOneBlog
    const manyBlogs = mocData.blogs

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(emptyArray)
        assert.strictEqual(result, 0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(manyBlogs)
        assert.strictEqual(result, 36)
    })
})