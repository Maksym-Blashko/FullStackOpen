import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import NewPersonInputForm from './components/NewPersonInputForm'
import FilterField from './components/FilterField'
import _isEqual from 'lodash/isEqual'
import axios from 'axios'

const Header = ({ text }) => <h2>{text}</h2>

const App = () => {
  // Variables
  const emptyString = ''
  const endpoint = 'http://localhost:3001/persons'

  // States
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState(emptyString)
  const [newNumber, setNewNumber] = useState(emptyString)
  const [filterName, setFilterName] = useState(emptyString)

  // Event handlers
  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = { name: newName, number: newNumber, id: persons.length + 1 }
    const containSamePerson = persons.some(person => {
      const { id, ...personWithoutId } = person
      const { id: newPersonId, ...newPersonWithoutId } = newPerson
      return _isEqual(personWithoutId, newPersonWithoutId)
    })

    if (containSamePerson) {
      alert(`${newName} is already added to phonebook`)
    } else {
      axios
        .post(endpoint, newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName(emptyString)
          setNewNumber(emptyString)
    })
      // setPersons(persons.concat(newPerson))
      // setNewName(emptyString)
      // setNewNumber(emptyString)
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
    axios
      .get(endpoint)
      .then(response => {
        setPersons(response.data)
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
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App