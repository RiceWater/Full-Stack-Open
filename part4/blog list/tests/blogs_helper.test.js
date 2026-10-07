const Blog = require('./../models/blogs')

const sampleBlogData = [
  {
    title: "One",
    author: "One",
    url: "website",
    likes: 10
  },
  {
    title: "Two",
    author: "Two",
    url: "website2",
    likes: 20
  }
]

const blogsInDB = async () => {
  return await Blog.find({})
}

module.exports = { sampleBlogData, blogsInDB }

