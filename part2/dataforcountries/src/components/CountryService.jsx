import axios from "axios"

const baseURL = 'https://studies.cs.helsinki.fi/restcountries'
const getAllPath = '/api/all'
const getCountryPath = '/api/name/'

const getAllCountries = () => {
    const url = `${baseURL}${getAllPath}`
    const request = axios.get(url)
    return request.then(response => response.data)
}

const getCountry = (name) => {
    const url = `${baseURL}${getCountryPath}${name.toLowerCase}`
    const request = axios.get(url)
    return request.then(response => response.data)
}

export default { getAllCountries, getCountry }