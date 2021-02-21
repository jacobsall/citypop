import React from 'react'
import '../css/CityResult.css'
/*
    -- CityResult -- 

    Displays a city name and it's population.
*/
export default function CityResult({city, pop}) {
    return (
        <div className="cityContainer">
            <h2>{city}<hr className="divider"/></h2>
            <div className="populationBox">
                <p className="populationTitle">Population:</p> 
                <h3> {pop} </h3>
            </div>
        </div>
    )
}
