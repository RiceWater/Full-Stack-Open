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

describe('favorite blog', () => {
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
    
    test('of an empty array will return an informative string', () => {
        const blogs = []
        const result = listHelper.favoriteBlog(blogs)
        assert.strictEqual(result, 'No blogs')
    })

    test('of an array with unique number of likes for each blog will return the most liked blog', () => {
        const blogs = sampleBlogs
        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, blogs[1])
    })

    test('of an array of blogs with identical number of likes will return the first blog', () => {
        const blogs = [sampleBlogs[1], sampleBlogs[1], sampleBlogs[1]]
        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, blogs[0])
    })
})

describe('most blogs', () => {
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
        },
        {
            id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Jake Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 15,
        }
    ]

    test('of an empty array of blogs will return an informattive string', () => {
        const blogs = []
        const result = listHelper.mostBlogs(blogs)
        assert.strictEqual(result, 'No author')
    })

    test('of an array of blogs will return the author with the most number of blogs  and their number of created blogs', () => {
        const blogs = sampleBlogs
        const result = listHelper.mostBlogs(blogs)
        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 2 })
    })

    test('of an array of blogs with identical number of authored blogs will return the author with the most number of blogs  and their number of created blogs', () => {
        let blogs = sampleBlogs
        blogs.push(sampleBlogs[2])
        const result = listHelper.mostBlogs(blogs)
        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 2 })
    })
})

describe('most likes', () => {
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
        },
        {
            id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Jake Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 15,
        }
    ]

    test('of an empty array will return an informative string', () => {
        const blogs = []
        const result = listHelper.mostLikes(blogs)
        assert.strictEqual(result, 'No author')
    })

    test('of an array of blogs will return the author with the most likes and their number of likes', () => {
        const blogs = sampleBlogs
        const result = listHelper.mostLikes(blogs)
        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 20 })
    })

    test('of an array of blogs with identical number of authored blogs will return the author with the most likes and their number of likes', () => {
        let blogs = sampleBlogs
        let extraBlog = sampleBlogs[2]
        extraBlog.likes = 5
        blogs.push(extraBlog)
        const result = listHelper.mostLikes(blogs)
        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 20 })
    })
})