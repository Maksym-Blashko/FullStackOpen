import axios from "axios"

const endpoint = 'http://localhost:3001/persons'

const getAll = () => {
    return axios
        .get(endpoint)
        .then(response => {
            return response.data
        })
}

const create = newObject => {
    return axios
        .post(endpoint, newObject)
        .then(response => {
            return response.data
        })
}

const update = (id, newObject) => {
    return axios
        .put(`${endpoint}/${id}`, newObject)
        .then(response => {
            return response.data
        })
}

export default { getAll, create, update }