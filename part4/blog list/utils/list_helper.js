const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, curr) => acc + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return "No blogs"
    }
    let indexWithMostLikes = 0
    for(let i = 0; i < blogs.length; i++ ) {
        if (blogs[i].likes > blogs[indexWithMostLikes].likes) {
            indexWithMostLikes = i
        }
    }
    return blogs[indexWithMostLikes]
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return "No author"
    }
    let authorBlogCounter = {}
    for(let i = 0; i < blogs.length; i++ ) {
        if (authorBlogCounter[`${blogs[i].author}`] === undefined) {
            authorBlogCounter[`${blogs[i].author}`] = 0
        } 
        authorBlogCounter[`${blogs[i].author}`] += 1
    }
    let keys = Object.keys(authorBlogCounter)
    let authorWithMostBlogs = keys[0]
    for(let i = 0; i < keys.length; i++ ) {
        if (authorBlogCounter[keys[i]] > authorBlogCounter[authorWithMostBlogs]) {
            authorWithMostBlogs = keys[i]
        }
    }
    return { author: authorWithMostBlogs, blogs: authorBlogCounter[authorWithMostBlogs] }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }