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

const customErrorMiddleware = (error, request, response, next) => {
    console.log(error)
    next(error)
}

const app = express()
app.use(express.static('dist'))
app.use(customMorganFormat)
app.use(express.json())

app.get('/api/persons', (_, res) => {
    Person.find({}).then(persons => res.json(persons))
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Person.find({id: id}).then(person => {
        res.json(person)
    })
    .catch(error => {
        res.statusMessage = "Person does not exist"
        res.status(404).end()
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id 
    Person.findByIdAndDelete(id).then(person => {
        console.log("ID deleted")
        res.status(204).end()
    })
    .catch(err => {
        console.log("Error", err, "aasd")
        next(error)
    })
    
})

app.post('/api/persons', (req, res) => {
    const name = req.body.name
    if (!name) {
        res.status(400).json({
            error: "'name' field required"
        })
        return 
    }  
    Person.find({name: { $ne: name }}).then(_ => {
        const newPerson = new Person({
            name: req.body.name,
            number: req.body.number
        })

        newPerson.save().then(person => {
            res.json(person)
        })
        
    })
    .catch(error => {
        res.status(400).json({
            error: "'name' field must be unique!"
        })
    })
    
    
})

app.get('/info', (_, res) => {
    const receivedAt = new Date() 
    res.send(`
        <p>Phonebook has info for ${Person.countDocuments} people</p>
        <p>${receivedAt}</p>
    `)
})

app.use(customErrorMiddleware)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})