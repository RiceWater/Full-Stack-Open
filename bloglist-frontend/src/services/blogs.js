import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async ({sessionToken, blog}) => {
  const response = await axios.post(baseUrl, blog, {
    headers: {
      Authorization: `Bearer ${sessionToken}`
    }
  })
  return response.data
}

export default { getAll, createBlog }