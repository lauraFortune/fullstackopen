import { useState, useEffect } from 'react'
import SearchBox from './components/SearchBox';
import Countries from './components/Countries';
import countryService from './services/countries'


const App = () => {

  // STATE VARIABLES
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  // EVENT HANDLERS - handle input changes
  const handleSearchTermChange = (e) => setSearchTerm(e.target.value)
  
  // ================= CRUD FUNCTIONS ================ //
  // ================================================= //
  
  // GET ALL countries function
  const fetchCountries = () => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
      .catch((err) => {
        console.log(`Error message: ${err.message}`)
      })
  }

  useEffect(fetchCountries, [])
 

  // ================== RENDERING ==================== //
  // ================================================= //
  return(
    <>
      <SearchBox searchTerm={searchTerm} onChange={handleSearchTermChange} />
      <Countries countries={countries} searchTerm={searchTerm} />
    </>
  )

}


export default App;
