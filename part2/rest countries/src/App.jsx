import { useEffect, useState } from 'react'
import axios from 'axios'

const NoResultsFound = () => {
  return (
    <div> 
      No Countries Found
    </div>
  )
}

const App = () => {
  const [query, setQuery] = useState('')
  const baseURL = "https://studies.cs.helsinki.fi/restcountries"
  const [c, setC] = useState({})
  const [countryFound, setCountryFound] = useState(false)
  
  useEffect(() => {
    axios
      .get(`${baseURL}/api/name/${query}`)
      .then(res => res.data)
      .then(body => {
        var fetchedLanguages = []
        for(const value of Object.values(body.languages)) {
          fetchedLanguages = fetchedLanguages.concat(value)
        }

        const cBody = {
          "name": body.name.common,
          "capital": body.capital["0"],
          "area": body.area,
          "languages": fetchedLanguages,
          "flag": body.flag
        }
        setC(cBody)
        console.log(cBody)
        
      })
      .catch(() => {
        setCountryFound(false)
        setC({})
      })
  }, [query])

  return (
    <div>
      <span>find countries </span>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {query !== '' && !countryFound ? <NoResultsFound /> : <></>} 
    </div>
  )
}

export default App
