import React from 'react'
/*
    -- CityResult -- 

    Displays a city name and it's population.
*/
export default function CityResult({city, pop}) {
    return (
        <div>
            <h2>{city}</h2>
            <p>Population: {pop}</p>
        </div>
    )
}
