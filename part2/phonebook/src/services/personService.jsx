import axios from "axios"

const baseUrl = "http://localhost:3000/"

const addPerson = newPerson => {
    const url = baseUrl + "persons"
    return axios
    .post(url, newPerson)
    .then(res => res.data)
}

export default { addPerson }