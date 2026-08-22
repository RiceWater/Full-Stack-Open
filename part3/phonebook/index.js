const express = require('express')

const persons = [
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

app.get('/api/persons', (_, res) => {
    res.json(persons)
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

app.get('/info', (_, res) => {
    const receivedAt = new Date()
    res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${receivedAt}</p>
    `)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})