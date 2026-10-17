const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id.toString()
    delete ret.__v
    delete ret._id
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User; 