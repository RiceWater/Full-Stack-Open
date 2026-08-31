import { useEffect, useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import MyNotification from './components/MyNotification'

import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterQuery, setNewFilterQuery] = useState('')
  const [notifMessage, setNotifMessage] = useState('')
  const [isError, setIsError] = useState(false)
  useEffect(() => {
    personService
      .getPersons()
      .then((persons) => setPersons(persons))
  }, [])

  const handleDeletePerson = person => {
    personService
    .deletePerson(person.id)
    .then(() => {
      personService
      .getPersons()
      .then((persons) => setPersons(persons))
      updateNotifMessage(`${person.name} has been removed from the server`)
      setIsError(false)
    })
    .catch(() => {
      setIsError(true)
      updateNotifMessage(`Information of ${person.name} has already been removed from the server`)
      personService
      .getPersons()
      .then((persons) => setPersons(persons))
    })
  }

  const updateNotifMessage = message => {
    setNotifMessage(message)
    setTimeout(() => {
      setNotifMessage('')
    }, 3000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <MyNotification message={notifMessage} isError={isError} />
      <Filter filterQuery={filterQuery} setNewFilterQuery={setNewFilterQuery} />
      <h2>Add a New Entry</h2>
      <PersonForm persons={persons} setPersons={setPersons} setNotifMessage={updateNotifMessage} setIsError={setIsError}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filterQuery={filterQuery} onDeletePerson={handleDeletePerson}/>
    </div>
  )
}

export default App