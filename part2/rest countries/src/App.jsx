import { useEffect, useState } from 'react'
import axios from 'axios'

const TooManyResults = () => {
  return (
    <div> 
      Too many matches, specify another filter
    </div>
  )
}

const CountryList = ({countries}) => 
  countries.map(country => <CountryRow country={country} key={country.name.common}/>
)


const CountryRow = ({country}) => {
  const [showCountryDetails, setShowCountryDetails] = useState(false)

  return (
     <div key={country.name.common}>
        <div>
          <span>{country.name.common}</span>
          <button onClick={() => setShowCountryDetails(!showCountryDetails)}>
            {showCountryDetails ? "hide" : "show"}
            </button>
        </div>
        { showCountryDetails && <CountryDetails country={country}/> }
      </div>
  )
}

const CountryDetails = ({country}) => {
  console.log(Object.entries(country.languages))
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {
          Object.entries(country.languages).map(element => <li key={element[1]}>{element[1]}</li>)
        }
      </ul>
      <p style={{ fontSize: 50 + 'px'}}>{country.flag}</p>
      
    </div>
  )
}

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