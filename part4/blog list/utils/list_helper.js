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

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return "No author"
    }
    let authorLikesTracker = {}
    for(let i = 0; i < blogs.length; i++ ) {
        if (authorLikesTracker[`${blogs[i].author}`] === undefined) {
            authorLikesTracker[`${blogs[i].author}`] = 0
        } 
        authorLikesTracker[`${blogs[i].author}`] += blogs[i].likes
    }
    let keys = Object.keys(authorLikesTracker)
    let authorWithMostBlogs = keys[0]
    for(let i = 0; i < keys.length; i++ ) {
        if (authorLikesTracker[keys[i]] > authorLikesTracker[authorWithMostBlogs]) {
            authorWithMostBlogs = keys[i]
        }
    }
    return { author: authorWithMostBlogs, likes: authorLikesTracker[authorWithMostBlogs] }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }