import { useEffect, useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterQuery, setNewFilterQuery] = useState('')

  useEffect(() => {
    personService
      .getPersons()
      .then((persons) => setPersons(persons))
  }, [])

  const handleDeletePerson = id => {
    personService
    .deletePerson(id)
    .then(() => {
      personService
      .getPersons()
      .then((persons) => setPersons(persons))
    })
    .catch(err => {
      alert("Errorrrr", err)
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterQuery={filterQuery} setNewFilterQuery={setNewFilterQuery} />
      <h2>Add a New Entry</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterQuery={filterQuery} onDeletePerson={handleDeletePerson}/>
    </div>
  )
}

export default App