const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()


const Person = require('./models/person')

// define morgan token
morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')) // body token defined above - logs request body data

// @ HANDLE ERRORS
const errorHandler = (error, request, response, next) => {

    if(error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    if(error.name === 'ValidationError'){
        return response.status(400).json({ errors: error.message })
    }


    next(error)
}

// @ HANDLE UNKNOWN ENDPOINTS
const unknownEndpoint = (request, response) => {
    response.status(400).send({ error: 'unknown endpoint' })
}

// @ GET ALL PERSONS - MONGOOSE
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.status(200).json(persons)
    })
})

// @ GET INFO PAGE
app.get('/info', (request, response, next) => {
    Person.countDocuments({}).then(personCount => {
        const timestamp = new Date().toDateString()
        const phonebookInfo = `<p>Phonebook has info for ${personCount} people</p><p>${timestamp}</p>`
        response.status(200).send(phonebookInfo)
    })
        .catch(error => next(error))
})

// @ GET PERSON BY ID
app.get('/api/persons/:id', (request, response, next) => {

    Person.findById(request.params.id).then(person => {
        if (person) {
            response.status(200).json(person)
        } else {
            response.status(404).end()
        }
    })
        .catch(error => next(error))
})

// @ CREATE A PERSON
app.post('/api/persons', (request, response, next) => {
    const { name, number } = request.body
    const person = new Person({ name, number })
    person.save()
        .then(createdPerson => {
            response.status(201).json(createdPerson)
        })
        .catch(error => {
            console.log(error)
            return next(error)
        })

})

// @ DELETE PERSON BY ID
app.delete('/api/persons/:id', (request, response, next) => {

    Person.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

// @ UPDATE PERSON BY ID
app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body
    const person = { name, number }

    const opts = {
        new: true,
        runValidators: true
    }
    Person.findByIdAndUpdate(request.params.id, person, opts)
        .then(updatedPerson => {
            response.status(200).json(updatedPerson)
        })
        .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

