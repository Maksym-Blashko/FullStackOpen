import CountryDetails from './CountryDetails'

const ListOfCountries = ({ countries }) => {
    const listItems = countries.map((item, index) => <div key={index}>{item.name.common}</div>)
    return <div>{listItems} </div>
}

const Content = ({ countries, searchText }) => {
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
            return <ListOfCountries countries={filteredCountries} />
        case (count > 10):
            return <div>Too many matches, specify another filter</div>
        default:
            return null
    }
}

export default Content