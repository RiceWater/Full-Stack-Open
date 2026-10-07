require('dotenv').config()

const mongoUrl = (process.env.NODE_ENV === 'test') ? 
  process.env.MONGODB_TEST_URL : process.env.MONGODB_URL 
const PORT = process.env.PORT

module.exports = { mongoUrl, PORT }