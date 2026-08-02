const Person = ({ person }) => <p>{person.name} {person.number}</p>

const Persons = ({ persons, filterQuery }) => {
  return (
      persons
      .filter((element) => element.name.includes(filterQuery))
      .map((p) => <Person key={p.id} person={p} />)
  )  
}
export default Persons;