const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url = process.env.MONGO_DB_URL

console.log('connecting to', url)

mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })


const personSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 5,
        required: [true, 'User name required']
    },
    number: {
        type: String,
        minLength: 8,
        required: [true, 'User phone number required'],
        validate: {
            validator: function(v) {
                return /^\d{2,3}-\d+$/.test(v)
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)




