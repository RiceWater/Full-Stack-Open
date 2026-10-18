const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [3, "Username must be at least 3 characters long"],
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: [3, "Password must be least 3 characters long"],
  },
  name: {
    type: String,
    required: true
  },
  blogs: [
    { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = doc._id.toString()
    delete ret.password
    delete ret.__v
    delete ret._id
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User; 