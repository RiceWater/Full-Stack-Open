const Person = ({ person, onDeletePerson}) => {
  return (
    <div>
      <span>{person.name} {person.number} </span>
      <button onClick={() => {
        if (window.confirm(`Delete ${person.name}?`)) {
          onDeletePerson(person)}
        }
      }>delete</button>
    </div>
  )
}

const Persons = ({ persons, filterQuery, onDeletePerson }) => {
  return (
      persons
      .filter((element) => element.name.includes(filterQuery))
      .map((p) => <Person key={p.id} person={p} onDeletePerson={onDeletePerson}/>)
  )  
}

export default Persons;