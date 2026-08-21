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
  const weatherAPI = import.meta.env.VITE_WEATHER_API_KEY
  const [temperature, setTemperature] = useState("")
  const [windSpeed, setWindSpeed] = useState("")
  const [imgURL, setImgURL] = useState("")
  const baseURL = "https://api.openweathermap.org/data/2.5/weather"
  
  useEffect(() => {  
    axios
    .get(`${baseURL}?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${weatherAPI}`)
    .then(res => res.data)
    .then(data => {
      setTemperature((data.main.temp - 273.15).toFixed(1))
      setWindSpeed(data.wind.speed)
      setImgURL(`https://openweathermap.org/payload/api/media/file/${data.weather[0].icon}.png`)
    })
    .catch(err => {
      alert("Errpr", err)
    })
  }, [])

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
      <h2>Weather in {country.name.common}</h2>
      <p>Temperature {temperature} Celcius</p>
      { imgURL && <img src={imgURL} alt='weather icon'/>}
      <p>Wind {windSpeed} m/s</p>
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