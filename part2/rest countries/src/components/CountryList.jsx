import { useState } from "react"
import CountryDetails from "./CountryDetails.jsx"

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

export default CountryList;