import { useState, useEffect } from 'react'
import CountryDetails from './CountryDetails'


const ListOfCountries = ({ countries, onShowDetails }) => {
    const listItems = countries.map((item, index) => {
        return <div key={index}>{item.name.common} <button onClick={() => onShowDetails(item)}>show</button></div>
    })
    return <div>{listItems}</div>
}

const Content = ({ countries, searchText }) => {
    // States
    const [selectedCountry, setSelectedCountry] = useState(null)

    // Event henlers
    const handleSelectedContry = (country) => {
        setSelectedCountry(country)
    }
    useEffect(() => {
        // Reset selected country when searchText changes
        setSelectedCountry(null);
      }, [searchText])

    if (searchText.length === 0) {
        return null
    }
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchText.toLowerCase()))
    const count = filteredCountries.length

    switch (true) {
        case (count === 0):
            return <div>Nothing found</div>
        case (count === 1):
            return <CountryDetails country={filteredCountries[0]} />
        case (count > 1 && count < 11):
            if (selectedCountry !== null) {
                return <CountryDetails country={selectedCountry} />
            }
            return <ListOfCountries countries={filteredCountries} onShowDetails={handleSelectedContry} />
        case (count > 10):
            return <div>Too many matches, specify another filter</div>
        default:
            return null
    }
}

export default Content