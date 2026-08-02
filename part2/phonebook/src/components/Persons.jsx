const Person = ({ person }) => <p key={person.id}>{person.name} {person.number}</p>

const Persons = ({ persons, filterQuery }) => {
  return (
      persons
      .filter((element) => element.name.includes(filterQuery))
      .map((p) => <Person person={p} />)
    
  )  
}
export default Persons;