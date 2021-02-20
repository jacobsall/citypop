import React from 'react'
import CityResult from "./CityResult"

export default function CountryResult({country, cities}) {

    return (
        <>
            <h2>{country}</h2>
            {cities.map(city =>(
                <button key={city.geonameId} >
                    {city.name}
                </button>
            ))}
        </>
    )
}
