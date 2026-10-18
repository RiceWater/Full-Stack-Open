const errorHandler = (error, _, response, next) => {
    if (error.name === 'CastError') {
        response.status(400).send({ message: "Invalid input! Cast error"})
    } else if (error.name === 'ValidationError') {
        response.status(400).json({ message: error })
    }
    next(error)
}

const getTokenHandler = (request, response, next) => {
  const token = request.get('authorization')
  const cleanToken = token?.startsWith('Bearer ') 
    ? token.replace('Bearer ', '') 
    : token
  request.token = cleanToken 
  next()
}

module.exports = { errorHandler, getTokenHandler }