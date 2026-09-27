const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test("dummy returns one", () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes', () => {
    const sampleBlogs = [
        {
            id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
        },
        {
            id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 15,
        }
    ]

    test('of an empty array is zero', () => {
        const blogs = []
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 0)
    })

    test('of an array with one blog is the same', () => {
        const blogs = [sampleBlogs[0]]
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 5)
    })

    test('of an array blogs is the total number of likes', () => {
        const blogs = sampleBlogs 
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 20)
    })
})