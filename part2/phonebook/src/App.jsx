import { useEffect, useState } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterQuery, setNewFilterQuery] = useState('')
  
  useEffect(() => {
    axios
    .get("http://localhost:3001/persons")
    .then((res) => {
      setPersons(res.data)
    })
  }, [])
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterQuery={filterQuery} setNewFilterQuery={setNewFilterQuery} />
      <h2>Add a New Entry</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterQuery={filterQuery}/>
    </div>
  )
}

export default App