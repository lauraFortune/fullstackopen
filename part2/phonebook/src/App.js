import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Header from './components/Header'
import personService from './services/persons'

const App = () => {
  
  // === STATE VARIABLES ===
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('')
  const [filterTerm, setFilterTerm] = useState('')

  // === EVENT HANDLERS ===
  // handle input changes
  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleFilterTermChange = (e) => setFilterTerm(e.target.value)

  // === EFFECT HOOKS ===

  // GET ALL PERSONS
  const fetchPersonsHook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(fetchPersonsHook, [])

  // === CRUD OPERATIONS ===

  // Update Person
  const updatePerson = (id) => {

    const person = persons.find((p) => p.id === id)
    const changedPerson = {...person, number: newNumber} // update person's number

    if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){ 
        personService
        .update(id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
        })
    }
  }

  // Create Person
  const addPerson = (event) => {
    event.preventDefault()

    // create person object
    const personObject = {
      name: newName,
      number: newNumber,
    }

    // check for duplicate name 
    const duplicateName = persons.find((person) => 
      person.name.trim().toLowerCase() === newName.trim().toLowerCase()
    )

    const create = personObject => {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    }
    
    // if duplicate name - update person's number
    duplicateName
    ? updatePerson(duplicateName.id)
    : create(personObject) // if not a dublicate: create person object

    // clear inputs on form submission
    setNewName('')
    setNewNumber('')
  }

  // Delete Person
  const deletePerson = (id, name) => {

    // new persons array with ommited person
    const updatedPersons = persons.filter((person) => {
      return person.id !== id
    })

    // if user confirms - delete person from db and update persons array
    if(window.confirm(`Delete ${name}`)){
      personService
      .remove(id)
      .then(() => {
        setPersons(updatedPersons)
      })
    }

  }

  // === RENDERING ===
  return (
    <div>
      <Filter filterTerm={filterTerm} onTermChange={handleFilterTermChange}/>
      <Header text="Phonebook" />
      <PersonForm 
        addPerson={addPerson}
        newName={newName} 
        newNumber={newNumber} 
        onNameChange={handleNameChange} 
        onNumberChange={handleNumberChange} 
      />
      <Header text="Numbers" />
      <Persons 
        persons={persons} 
        filterTerm={filterTerm} 
        handleDeleteClick={deletePerson}
      />
    </div>
  )
}


export default App
