import { useState } from 'react'

const App = () => {
  const [query, setQuery] = useState('')
  const baseURL = "https://studies.cs.helsinki.fi/restcountries"
  return (
    <div>
      <span>find countries </span>
      <input value={query} onChange={e => setQuery(e.target.value)} />
    </div>
  )
}

export default App
