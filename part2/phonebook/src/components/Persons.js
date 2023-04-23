import Person from "./Person"

const Persons = ({persons, filterTerm, handleDeleteClick}) => {

    // filtered persons
    const filtered = persons.filter((person) => 
        person.name.toLowerCase().startsWith(filterTerm.toLowerCase()))

    return(
        <div>
            {
                filtered.map((person) => 
                    <Person 
                        key={person.name} 
                        name={person.name} 
                        number={person.number} 
                        onClick={()=>handleDeleteClick(person.id, person.name)}
                    />
                )
            }
        </div>
   )

 }

 

 export default Persons