import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import NewPersonInputForm from './components/NewPersonInputForm'
import FilterField from './components/FilterField'
import personService from './services/PersonService'

const Header = ({ text }) => <h2>{text}</h2>

const App = () => {
  // Variables
  const emptyString = ''

  // States
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState(emptyString)
  const [newNumber, setNewNumber] = useState(emptyString)
  const [filterName, setFilterName] = useState(emptyString)

  // Event handlers
  const addPerson = (event) => {
    event.preventDefault()

    const newID = Math.max(...persons.map(person => person.id)) + 1
    const newPerson = { name: newName, number: newNumber, id: newID }

    const samePerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (samePerson && samePerson.number === newNumber) {
      alert(`${newName} is already added to phonebook`)

    } else if (samePerson && samePerson.number !== newNumber) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personForUpdate = { name: newName, number: newNumber }
        personService
          .updatePerson(samePerson.id, personForUpdate)
          .then(changedPerson => {
            setPersons(persons.map(n => n.id !== samePerson.id ? n : changedPerson))
            setNewName(emptyString)
            setNewNumber(emptyString)
          })
      }

    } else {
      personService
        .create(newPerson)
        .then(person => {
          setPersons(persons.concat(person))
          setNewName(emptyString)
          setNewNumber(emptyString)
        })
    }
  }
  const handleDeletePerson = (id) => {
    const person = persons.find(n => n.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(person.id)
      setPersons(persons.filter(person => person.id !== id))
    }
  }
  const handleInputNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleInputNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleInputFilterName = (event) => {
    setFilterName(event.target.value)
  }
  const handleClearFilterField = () => { setFilterName(emptyString) }

  // Filter persons based on the entered filter name
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  )

  // Load json file with persons from server
  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  return (
    <div>
      <Header text='Phonebook' />
      <FilterField
        onChange={handleInputFilterName}
        onClick={handleClearFilterField}
        inputValue={filterName} />
      <Header text='add a new' />
      <NewPersonInputForm
        onSubmit={addPerson}
        onChangeName={handleInputNameChange}
        onChangeNumber={handleInputNumberChange}
        inputValueName={newName}
        inputValueNumber={newNumber} />
      <Header text='Numbers' />
      <Persons persons={filteredPersons} deleteButton={handleDeletePerson} />
    </div>
  )
}

export default App