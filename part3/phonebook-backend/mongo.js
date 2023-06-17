// Import dependencies
require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

// Define Person schema
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

// Create Person model
const Person = mongoose.model('Person', personSchema)

// Command-line arguments
const argLength = process.argv.length
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

// Open mongoose connection
const url = process.env.MONGO_DB_URL.replace('<password>', password)
mongoose.connect(url)

// Handle command-line arguments
let person

switch(argLength) {
case 2: // No password provided
    console.log('** Please provide a password as an argument(e.g., node mongo.js <password>)')
    process.exit(1)
    break
case 3: // Display phonebook
    Person.find({}).then(persons => {
        console.log('phonebook:')
        persons.forEach(p => console.log(p.name, p.number))
        mongoose.connection.close()
    })
    break
case 4: // Incomplete arguments
    console.log('** Please provide contact details as arguments(e.g., node mongo.js <password> <name> <number>)')
    process.exit(1)
    break
case 5: // Create and save person
    person = new Person({ name, number })
    person.save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
    break
default: // all other argument lengths
    console.log('** Invalid number of arguments. Please check your command.')
    process.exit(1)
    break
}


