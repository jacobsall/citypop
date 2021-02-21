import React from 'react'
import '../css/Header.css'
import {Link} from 'react-router-dom'
/*
    -- Header --

    Simple header to hold title of page.
*/
export default function Header() {
    return (
        <div className="header">
                <Link to="/" className="headerLink">
                    CityPop
                </Link>
        </div>
    )
}
