import { useState } from "react"

const PersonForm = ({ persons, setPersons}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  const handleOnSubmitForm = (e) => {
    e.preventDefault()
    const newPerson = {name: newName, number: newNumber, id: persons.length + 1}
    if (persons.map((e) => e.name).includes(newPerson.name)) {
      alert(`${newPerson.name} is already added in the phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
      setNewName("")
      setNewNumber("")
    }
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