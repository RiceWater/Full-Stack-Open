const app = require('./app')
const {_, PORT} = require('./utils/config')

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})