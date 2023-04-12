import { useState } from 'react'

const Person = ({name, number}) => <p>{name} {number}</p>


const App = () => {
  const [persons, setPersons] = useState([ { name: 'Arto Hellas', number: '040-1234567'} ]) 

  const [newName, setNewName] = useState('') // form input
  const [newNumber, setNewNumber] = useState('')

  const addContact = (event) => {
    event.preventDefault()

    const duplicateName = persons.find((person) => {
      return person.name.toLowerCase() === newName.toLowerCase()
    })

    const nameObject = {
      name: newName,
      number: newNumber,
    }

    const updatePersons = duplicateName
      ? alert(`${newName} is already added to the phonebook`)
      : setPersons(persons.concat(nameObject))
    
    setNewName('')
    setNewNumber('')
  }

  // handle input changes
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>

      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div> name: <input value={newName} onChange={handleNameChange}/> </div>
        <div> number: <input value={newNumber} onChange={handleNumberChange} /> </div>
        <div> <button type="submit">add</button> </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {
          persons.map((person) => 
            <Person key={person.name} name={person.name} number={person.number}/>
          )
        }
      </div>

    </div>
  )
}

export default App