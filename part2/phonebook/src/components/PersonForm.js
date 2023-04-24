
const PersonForm = ({onSubmit, newName, newNumber, onNameChange, onNumberChange}) => {

    return(
        <form onSubmit={onSubmit}>
            <div>
                name: <input value={newName} onChange={onNameChange} /><br/>
                number: <input value={newNumber} onChange={onNumberChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )

}



export default PersonForm