import { useState } from 'react'
import Persons from './components/Persons'
import NewPersonInputForm from './components/NewPersonInputForm'
import FilterField from './components/FilterField'
import _isEqual from 'lodash/isEqual'

const Header = ({ text }) => <h2>{text}</h2>

const App = () => {
  const initialPhonebook = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]
  const emptyString = ''

  // States
  const [persons, setPersons] = useState(initialPhonebook)
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
      setPersons(persons.concat(newPerson))
      setNewName(emptyString)
      setNewNumber(emptyString)
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