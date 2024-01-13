import { useState, useEffect } from 'react'
import FilterField from './components/FilterField'
import countryService from './components/CountryService'
import Content from './components/Content'
import './index.css'

function App() {
  // States
  const [searchText, setSearchText] = useState('')
  const [countries, setCountries] = useState([])

  // Event handlers
  useEffect(() => {
    countryService
      .getAllCountries()
      .then(countries => {
        setCountries(countries)
      })
      .catch(error => {
        console.log(`Error getting list of country: ${error}`)
      })
  }, [])

  const handleInputFilterName = (event) => {
    setSearchText(event.target.value)
  }
  const handleClearFilterField = () => { setSearchText('') }

  return (
    <>
      <FilterField
        onChange={handleInputFilterName}
        onClick={handleClearFilterField}
        inputValue={searchText} />
      <Content countries={countries} searchText={searchText} />
    </>
  )
}

export default App
