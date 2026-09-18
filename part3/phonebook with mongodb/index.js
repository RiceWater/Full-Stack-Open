require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
var morgan = require('morgan')

morgan.token('type', (req, _) => JSON.stringify(req.body))
const customMorganFormat = morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.type(req, res)
    ].join(' ')
})

var persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const app = express()
app.use(express.static('dist'))
app.use(customMorganFormat)
app.use(express.json())

app.get('/api/persons', (_, res) => {
    Person.find({}).then(persons => res.json(persons))
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id === id)
    if (!person) {
        res.statusMessage = "Person does not exist"
        res.status(404).end()
        return 
    }
    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id 
    Person.findByIdAndDelete(id).then(person => {
        console.log("ID deleted")
        res.status(204).end()
    })
    .catch(err => {
        console.log("Error", err, "aasd")
    })
    
})

const generateId = () => {
    const id = Math.floor(Math.random() * 1_000_000_000) + 1
    return `${id}`
}

app.post('/api/persons', (req, res) => {
    const name = req.body.name
    if (!name) {
        res.status(400).json({
            error: "'name' field required"
        })
        return 
    }  
    if (persons.find(person => person.name === name)) {
        res.status(400).json({
            error: "'name' field must be unique"
        })
        return
    }
    
    const newPerson = new Person({
        name: req.body.name,
        number: req.body.number
    })

    newPerson.save().then(person => {
        res.json(person)
    })
})

app.get('/info', (_, res) => {
    const receivedAt = new Date() 
    res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${receivedAt}</p>
    `)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})