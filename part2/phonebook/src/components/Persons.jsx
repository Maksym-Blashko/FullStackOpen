const Persons = ({ persons, deleteButton }) => {
    return (
        <div>
            {persons.map(person =>
                <div key={person.id}>
                    {person.name} {person.number} <button onClick={() => deleteButton(person.id)}>delete</button>
                </div>
            )}
        </div>
    )
}

export default Persons