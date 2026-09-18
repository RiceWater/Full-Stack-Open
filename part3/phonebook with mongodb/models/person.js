const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
mongoose.connect(url, { family: 4 })
.then(_ => {
    console.log("Connection success")
})
.catch(err => {
    console.log(`Connection failed. ${err}`)
})

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
personSchema.set('toJSON', {
    transform: (_, ret) => {
        ret.id = ret._id.toString()
        delete ret.__v
        delete ret._id
    }
})

module.exports = mongoose.model('Person', personSchema)