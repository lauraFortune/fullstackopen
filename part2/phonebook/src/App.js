import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Header from './components/Header'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('')
  const [filterTerm, setFilterTerm] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])
  
  console.log('render', persons.length, 'persons', persons)
  
  // add new person function
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

    // if name already exists - alert, else add new contact 
    duplicateName
    ? alert(`${newName} is already added to the phonebook`)
    : setPersons(persons.concat(personObject))

    // clear inputs on form submission
    setNewName('')
    setNewNumber('')
  }

  // handle input changes
  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleFilterTermChange = (e) => setFilterTerm(e.target.value)

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