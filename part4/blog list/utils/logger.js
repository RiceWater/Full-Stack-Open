const errorHandler = (error, _, response, next) => {
    if (error.name === 'CastError') {
        response.status(400).send({ message: "Invalid input! Cast error"})
    } else if (error.name === 'ValidationError') {
        response.status(400).json({ message: error })
    }
    next(error)
}

module.exports = errorHandler