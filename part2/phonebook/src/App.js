import { useState } from 'react'

const Person = ({name}) => {
  return(
    <p>{name}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('') // form input

  const addName = (event) => {
    event.preventDefault()

    const duplicateName = persons.find((person) => {
      return person.name.toLowerCase() === newName.toLowerCase()
    })

    const nameObject = {
      name: newName
    }

    const updatePersons = duplicateName
      ? alert(`${newName} is already added to the phonebook`)
      : setPersons(persons.concat(nameObject))
    
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>

      <h2>Phonebook</h2>

      <form onSubmit={addName}>
        <div> name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <div>
        {
          persons.map((person) => 
            <Person key={person.name} name={person.name}/>
          )
        }
      </div>

    </div>
  )
}

export default App