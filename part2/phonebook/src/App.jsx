import { useState } from 'react'
import Persons from './components/Persons'
import InputForm from './components/InputForm'
import _isEqual from 'lodash/isEqual'

const Header = ({ text }) => <h2>{text}</h2>

const App = () => {
  const initialPhonebook = [
    { name: 'Arto Hellas', number: '123-321-456' }
  ]
  const emptyString = ''

  // States
  const [persons, setPersons] = useState(initialPhonebook) 
  const [newName, setNewName] = useState(emptyString)
  const [newNumber, setNewNumber] = useState(emptyString)

  // Event handlers
  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = { name: newName, number: newNumber }
    const containSamePerson = persons.some( person => _isEqual(person, newPerson))
    
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

  return (
    <div>
      <Header text='Phonebook' />
      <InputForm 
        onSubmit={addPerson} 
        onChangeName={handleInputNameChange}
        onChangeNumber={handleInputNumberChange}
        inputValueName={newName}
        inputValueNumber={newNumber} />
      <Header text='Numbers' />
      <Persons persons={persons} />
    </div>
  )
}

export default App