import React from 'react'

export default function CityResult(props) {
    return (
        <div>
            <h2>{props.city}</h2>
            <p>{props.pop}</p>
        </div>
    )
}
