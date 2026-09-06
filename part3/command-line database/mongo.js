const mongoose = require('mongoose')

const argumentLength = process.argv.length
if (argumentLength < 3) {
    console.log("Password needed")
    process.exit(1)
} 
if (argumentLength >= 6) {
    console.log("Too many arguments!")
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.0isgkqq.mongodb.net/phonebook?appName=Cluster0`
mongoose.connect(url, { family: 4 })

const person = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', person)

if (argumentLength < 4) {
    Person.find({}).then(res => {
        res.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
} else if (argumentLength < 5) {
    console.log("incomplete arguments")
    process.exit(1)
} else {
    console.log("add/update entry to database")
    const newPerson = new Person({ 
        name: process.argv[3],
        number: process.argv[4]
    })
    newPerson.save().then(res => {
        console.log(`Added ${res.name} number ${res.number} to phonebook`)
        mongoose.connection.close()
    })
}





