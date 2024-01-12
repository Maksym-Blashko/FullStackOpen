import axios from "axios"

const endpoint = 'http://localhost:3001/persons'

const getAll = () => {
    return axios
        .get(endpoint)
        .then(response => response.data)
}

const create = newObject => {
    return axios
        .post(endpoint, newObject)
        .then(response => response.data)
}

const updatePerson = (id, newObject) => {
    return axios
        .put(`${endpoint}/${id}`, newObject)
        .then(response => response.data)
}

const deletePerson = id => {
    return axios
        .delete(`${endpoint}/${id}`)
        .then(response => response.data)

}

export default { getAll, create, updatePerson, deletePerson }