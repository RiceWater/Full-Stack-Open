import { useState, useEffect } from "react"
import axios from "axios"

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

export default CountryDetails;