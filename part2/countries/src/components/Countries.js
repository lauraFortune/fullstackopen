import Country from "./Country"
import CountryListItem from "./CountryListItem"
const Countries = ({ countries, searchTerm, setSearchTerm}) => {

    const handleShowClick = (countryName) => {
        setSearchTerm(countryName)
    }
    
    // creates a filtered array of countries that match the searchTerm
    const filtered = countries.filter((country) => {
        return(
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })

    // display list of countries if there is a searchterm and there are less than 11 matches
    const countryList = searchTerm && filtered.length <= 10 && filtered.length > 1
    ? filtered.map((country) => <CountryListItem key={country.cca3} name={country.name.common} onClick={() => handleShowClick(country.name.common)}/>)
    : null

    // display message if there is a searchterm and there are greater than 10 matches
    const tooManyMatches = filtered.length > 10 && searchTerm
        ? <p>Too many matches, specify another filter</p>
        : null

    // display selected country if there is only 1 match
    const selectedCountry = filtered.length === 1 
        ? <Country selectedCountry={filtered[0]} />
        : null
    
    return (
        <>  
            {countryList}
            {selectedCountry}
            {tooManyMatches}
        </>
    )

}

export default Countries