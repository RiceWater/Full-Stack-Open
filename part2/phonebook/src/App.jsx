import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleOnSubmitForm = (e) => {
    e.preventDefault()
    const newPerson = {name: newName, number: newNumber}
    if (persons.map((e) => e.name).includes(newPerson.name)) {
      alert(`${newPerson.name} is already added in the phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
      setNewName("")
      setNewNumber("")
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      {
        persons.map((element) => <p key={element.name}>{element.name} {element.number}</p>)
      }
    </div>
  )
}

export default App