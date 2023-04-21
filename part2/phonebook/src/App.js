import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Header from './components/Header'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('')
  const [filterTerm, setFilterTerm] = useState('')
  // handle input changes
  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleFilterTermChange = (e) => setFilterTerm(e.target.value)

  // =====================  GET ALL PERSONS
  //=======================================
  const fetchPersonsHook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(fetchPersonsHook, [])

  // =====================  CREATE PERSON
  //=====================================
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

    // check for duplicate name
    duplicateName
    ? alert(`${newName} is already added to the phonebook`)
    : create(personObject) // if not a dublicate: create person object

    // clear inputs on form submission
    setNewName('')
    setNewNumber('')
  }


  return (
    <div>
      <Filter filterTerm={filterTerm} onTermChange={handleFilterTermChange}/>
      <Header text="Phonebook" />
      <PersonForm 
        addPerson={addPerson}
        newName={newName} 
        newNumber={newNumber} 
        onNameChange={handleNameChange} 
        onNumberChange={handleNumberChange} />
      <Header text="Numbers" />
      <Persons persons={persons} filterTerm={filterTerm} />
    </div>
  )
}


export default App
