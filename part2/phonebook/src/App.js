import { useState } from 'react'

const Person = ({name, number}) => <p>{name} {number}</p>


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  // inputs
  const [newName, setNewName] = useState('') 
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // filter contacts
  const filtered = persons.filter((person) => {
    return person.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  })

  // add new contact
  const addPerson = (event) => {
    event.preventDefault()

    // check for duplicate name 
    const duplicateName = persons.find((person) => {
      return person.name.toLowerCase() === newName.toLowerCase()
    })

    // create new person object
    const personObject = {
      name: newName,
      number: newNumber,
    }

    // if name already exists - alert, else add new contact 
    const updatePersons = duplicateName
      ? alert(`${newName} is already added to the phonebook`)
      : setPersons(persons.concat(personObject))

    // clear input boxes on form submission
    setNewName('')
    setNewNumber('')
  }

  // handle input changes
  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handlesSearchTermChange = (e) => setSearchTerm(e.target.value)

  return (
    <div>
      <div> filter shown with: <input value={searchTerm} onChange={handlesSearchTermChange}/> </div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div> name: <input value={newName} onChange={handleNameChange}/> </div>
        <div> number: <input value={newNumber} onChange={handleNumberChange} /> </div>
        <div> <button type="submit">add</button> </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {
          filtered.map((person) => 
            <Person key={person.name} name={person.name} number={person.number}/>
          )
        }
      </div>

    </div>
  )
}

export default App