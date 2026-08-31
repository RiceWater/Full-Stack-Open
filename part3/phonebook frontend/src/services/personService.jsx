import axios from "axios"

const baseUrl = "http://localhost:3001"
const url = `${baseUrl}/api/persons`

const addPerson = newPerson => {
  return axios
    .post(url, newPerson)
    .then(res => res.data)
}

const getPersons = () => {
  return axios
    .get(url)
    .then(res => res.data)
}

const updatePerson = (person) => {
  return axios
  .put(url + `/${person.id}`, person)
  .then(res => res.data)
}
const deletePerson = id => {
  return axios
  .delete(url + `/${id}`)
  .then(res => res.data)
}

export default { addPerson, getPersons, updatePerson, deletePerson }