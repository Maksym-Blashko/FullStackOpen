import { useState } from 'react'
import Persons from './components/Persons'
import InputForm from './components/InputForm'

const Header = ({ text }) => <h2>{text}</h2>

const App = () => {
  const initialPhonebook = [
    { name: 'Arto Hellas' }
  ]
  const emptyString = ''

  // States
  const [persons, setPersons] = useState(initialPhonebook) 
  const [newName, setNewName] = useState(emptyString)

  // Event handlers
  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName }
    setPersons(persons.concat(newPerson))
    setNewName(emptyString)
  }
  const handleInputNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <Header text='Phonebook' />
      <InputForm 
        title='name'
        onSubmit={addPerson} 
        onChange={handleInputNameChange}
        inputValue={newName} />
      <Header text='Numbers' />
      <Persons persons={persons} />
    </div>
  )
}

export default App