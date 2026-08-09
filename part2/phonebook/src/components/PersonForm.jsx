import { useState } from "react"

import personService from "../services/personService"

const PersonForm = ({ persons, setPersons, setNotifMessage, setIsError}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  const handleOnSubmitForm = (e) => {
    e.preventDefault()
    const foundPersonIndex = persons.findIndex(element => element.name === newName)
    if (foundPersonIndex !== -1) {
      updateExistingPerson(foundPersonIndex)
    } else {
      createNewPerson()
    }
  }

  const updateExistingPerson = foundPersonIndex => {
    const windowMessage = `${persons[foundPersonIndex].name} is already added in the phonebook. Replace old number with a new one?` 
      if (window.confirm(windowMessage)) {
        const personToUpdate = {...persons[foundPersonIndex], number: newNumber}
        personService
        .updatePerson(personToUpdate)
        .then(res => {
          let newPersons = persons.map(person => person.name === personToUpdate.name ? res : person)
          setPersons(newPersons)
          setNotifMessage(`Updated ${res.name}`)
          setIsError(false)
        })
        .catch(message => {
          setNotifMessage(message)
          setIsError(true)
        })
      }
  }

  const createNewPerson = () => {
      const newPerson = {name: newName, number: newNumber, id: persons.length + 1}
      personService.addPerson(newPerson)
      .then(storedPerson => {
        setPersons(persons.concat(storedPerson))
        setNewName("")
        setNewNumber("")
        setNotifMessage(`Added ${storedPerson.name}`)
        setIsError(false)
      })
      .catch(message => {
        setNotifMessage(message)
        setIsError(true)
      })
  }

  return (
    <form onSubmit={handleOnSubmitForm}>
    <div>
    name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/>
    </div>
    <div>
    number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)}/>
    </div>
    <div>
    <button type="submit">add</button>
    </div>
    </form>
  )
}

export default PersonForm;