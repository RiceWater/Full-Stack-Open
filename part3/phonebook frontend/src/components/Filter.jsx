const Filter = ({ filterQuery, setNewFilterQuery }) => {
  return (
    <div>
      <span>filter shown with </span>
      <input value={filterQuery} onChange={(e) => setNewFilterQuery(e.target.value)}/>
    </div>
  )
}

export default Filter