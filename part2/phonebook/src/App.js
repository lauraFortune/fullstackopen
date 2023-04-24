import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Header from './components/Header'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  
  // STATE VARIABLES 
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('')
  const [filterTerm, setFilterTerm] = useState('')
  const [message, setMessage] = useState({ type: '', text: '' })

  // EVENT HANDLERS - handle input changes
  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleFilterTermChange = (e) => setFilterTerm(e.target.value)

  // ================= CRUD FUNCTIONS ================ //
  // ================================================= //

  // GET ALL persons function
  const fetchPersons = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {                                                  
        console.log(`Error message: ${error.message}`)
        setMessage({ type: 'error', text: `Error: ${error.message}` })
        setTimeout(() => {
          setMessage({type: '', text: '' })
        }, 5000)
        
      })
  }

  useEffect(fetchPersons, [])

  // CREATE person function
  const createPerson = personObject => { 
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setMessage({ type: 'success', text: `Added ${returnedPerson.name}`})
        setTimeout(() => {
          setMessage({type: '', text: '' })
        }, 5000)
      })
      .catch(
        error => {
          console.log(`Error message: ${error.message}`)
          setMessage({ type: 'error', text: `Error: ${error.message}`})
        }
      )
  }

  // UPDATE person function
  const updatePerson = (id) => {

    const personObject = persons.find((p) => p.id === id)
    const changedPerson = {...personObject, number: newNumber} // update person's number

    if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){ 
        personService
        .update(id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
          setMessage({ type: 'success', text: `Updated ${returnedPerson.name}'s number`})
          setTimeout(() => {
            setMessage({type: '', text: '' })
          }, 5000)
        })
        .catch(error => {
          console.log(`Error message: ${error.message}`)
          setMessage({ type: 'error', text: `Information of ${personObject.name} has already been removed from server` })
          setTimeout(() => {
            setMessage({type: '', text: '' })
          }, 5000)
          setPersons(persons.filter(p => p.id !== id)) 
        })
    }
  }
  
  // DELETE person function
  const deletePerson = (id, name, updatedPersons) => {
    personService
    .remove(id)
    .then(() => {
      setPersons(updatedPersons)
      setMessage({ type: 'success', text: `Successfully deleted ${name}` })
      setTimeout(() => {
        setMessage({type: '', text: '' })
      }, 5000)
    })
    .catch(error => {
      console.log(`Error message: ${error.message}`)
      setMessage({type: 'error', text: `Information of ${name} has already been removed from server` })
      setPersons(updatedPersons)
      setTimeout(() => {
        setMessage({type: '', text: '' })
      }, 5000)
    }

    )
  }

  // ================== SUBMIT PERSON ================ //
  // ================================================= //

  const submitForm = (event) => {
    event.preventDefault()

    // create person object - with input values
    const personObject = {
      name: newName,
      number: newNumber,
    }

    // check for duplicate name 
    const duplicateName = persons.find((person) => 
      person.name.trim().toLowerCase() === newName.trim().toLowerCase()
    )

    // if duplicate name exists - update person's number
    // else create a new person object
    duplicateName
    ? updatePerson(duplicateName.id) // update - api call
    : createPerson(personObject) // create - api call

    // clear form inputs on submission
    setNewName('')
    setNewNumber('')
  }


  // ================== DELETE PERSON ================ //
  // ================================================= // 
  const handleDeleteClick = (id, name) => {
    
    // new persons array with ommited person
    const updatedPersons = persons.filter((person) => {
      return person.id !== id
    })

    // if user confirms - delete person from db and update persons array
    if(window.confirm(`Delete ${name}`)){
      deletePerson(id, name, updatedPersons) // delete api call
    }

  }

  // ================== RENDERING ==================== //
  // ================================================= //
  return (
    <div>
      <Filter filterTerm={filterTerm} onTermChange={handleFilterTermChange}/>
      <Header text="Phonebook" />
      <Notification message={message} />
      <PersonForm 
        onSubmit={submitForm}
        newName={newName} 
        newNumber={newNumber} 
        onNameChange={handleNameChange} 
        onNumberChange={handleNumberChange} 
      />
      <Header text="Numbers" />
      <Persons 
        persons={persons} 
        filterTerm={filterTerm} 
        onDeleteClick={handleDeleteClick}
      />
    </div>
  )
}


export default App
