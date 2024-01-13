
const Languages = ({ obj }) => {
    const languages = Object.values(obj)
    const listItems = languages.map((item, index) => <li key={index}>{item}</li>)

    return <ul>{listItems} </ul>
}

const CountryDetails = ({ country }) => {
    if (country === null) {
        return null
    }

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital[0]}</div>
            <div>area {country.area}</div>
            <p><strong>languages:</strong></p>
            <Languages obj={country.languages} />
            <img className='flag' src={country.flags.png} alt={country.flags.alt} />
        </div>
    )
}

export default CountryDetails