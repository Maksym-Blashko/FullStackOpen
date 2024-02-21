const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const mocData = require('../utils/moc_data')

describe('favorite blog', () => {
    const emptyArray = []
    const listWithOneBlog = mocData.listWithOneBlog
    const manyBlogs = mocData.blogs

    const favoriteFromManyBlogs = mocData.favoriteFromManyBlogs
    const favoriteFromOneBlog = mocData.favoriteFromOneBlog

    test('of empty list is returned null', () => {
        const result = listHelper.favoriteBlog(emptyArray)
        assert.deepStrictEqual(result, null)
    })

    test('when list has only one blog, returned it', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        assert.deepStrictEqual(result, favoriteFromOneBlog)
    })

    test('of a bigger list is returned right', () => {
        const result = listHelper.favoriteBlog(manyBlogs)
        assert.deepStrictEqual(result, favoriteFromManyBlogs)
    })
})