import { useEffect, useState } from 'react'
import axios from 'axios'

const TooManyResults = () => {
  return (
    <div> 
      Too many matches, specify another filter
    </div>
  )
}

const CountryList = ({countries}) => {
  return countries.map(element => <p key={element.name.common}>{element.name.common}</p>)
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

// useEffect(() => {
//     axios
//       .get(`${baseURL}/api/name/${query}`)
//       .then(res => res.data)
//       .then(body => {
//         var fetchedLanguages = []
//         for(const value of Object.values(body.languages)) {
//           fetchedLanguages = fetchedLanguages.concat(value)
//         }

//         const cBody = {
//           "name": body.name.common,
//           "capital": body.capital["0"],
//           "area": body.area,
//           "languages": fetchedLanguages,
//           "flag": body.flag
//         }
//         setC(cBody)
//         console.log(cBody)
        
//       })
//       .catch(() => {
//         setCountryFound(false)
//         setC({})
//       })
//   }, [query])
