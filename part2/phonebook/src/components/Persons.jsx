const Persons = ({ persons }) => {
    return (
      <div>
        {persons.map( (person, i) =>
          <p key={i}> {person.name}</p>
        )}
      </div>
    )
  }

  export default Persons