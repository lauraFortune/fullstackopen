import Country from "./Country"

const Countries = ({ countries, searchTerm}) => {

    // creates a filtered array of countries that match the searchTerm
    const filtered = countries.filter((c) => {
        return(
            c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })

    // display list of countries if there is a searchterm and there are less than 11 matches
    const countryList = searchTerm && filtered.length <= 10
    ? filtered.map((country) => <p key={country.name.official}>{country.name.common}</p>)
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



// import Country from "./Country"

// const FilteredCountries = ({ countries, searchTerm}) => {

//     // creates a filtered list of countries that match the searchTerm
//     const filtered = countries.filter((country) => {
//         return(
//             country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//     })

//     const selectedCountry = filtered[0]


//     if (filtered.length == 1) {
   
//         return(
//             <>
//                 <Country selectedCountry={selectedCountry} />
//             </>
//         )
//     } else if (filtered.length <= 10) { // display countries if there are 10 or fewer matches

//         return(
//             <> 
//                 {   // render the list of filtered countries if there is a searchTerm
//                     searchTerm && filtered.map((country) => 
//                     <p key={country.name.official}>{country.name.common}</p>
//                     )
//                 }
//             </>
//         )

//     } else if( filtered.length !== countries.length ){ // display message if there are more than 10 matches and a searchTerm has been entered

//         return(
//             <>
//                 <p>Too many matches, specify another filter</p>
//             </>
//         )
//     }

// }


// export default FilteredCountries