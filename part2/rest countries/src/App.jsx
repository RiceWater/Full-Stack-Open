import { useEffect, useState } from 'react'
import axios from 'axios'
import TooManyResults from './components/TooManyResults'
import CountryList from './components/CountryList'
import CountryDetails from './components/CountryDetails'

const App = () => {
  const [query, setQuery] = useState('')
  const baseURL = "https://studies.cs.helsinki.fi/restcountries"
  const [countryList, setCountryList] = useState([])
  const [matchedCountries, setMatchedCountries] = useState([])
  useEffect(() => {
    axios
      .get(`${baseURL}/api/all`)
      .then(res => setCountryList(res.data))
  }, [])

  const handleQueryChange = e => {
    const value = e.target.value 
    setQuery(value)
    const lowerCasedValue = value.toLowerCase()
    const filteredCountries = countryList.filter(element => {
      if (element.name.common.toLowerCase().includes(lowerCasedValue)) {
        return element
      }
    }) 
    setMatchedCountries(filteredCountries)
  }
  
  return (
    <div>
      <span>find countries </span>
      <input value={query} onChange={e => handleQueryChange(e)} />
      {
        matchedCountries.length > 10 ? <TooManyResults /> : 
        matchedCountries.length === 1 ? <CountryDetails country={matchedCountries[0]} /> :
        <CountryList countries={matchedCountries} />} 
    </div>
  )
}

export default App