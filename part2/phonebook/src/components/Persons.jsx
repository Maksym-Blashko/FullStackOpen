const Persons = ({ persons }) => {
    return (
      <div>
        {persons.map( (person, i) =>
          <p key={i}> {person.name} {person.number}</p>
        )}
      </div>
    )
  }

  export default Persons