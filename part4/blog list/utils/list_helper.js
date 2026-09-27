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

module.exports = { dummy, totalLikes, favoriteBlog }