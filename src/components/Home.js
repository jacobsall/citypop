import React from 'react'
import {Link} from 'react-router-dom'
/*
    -- Home --

    Home page component. Holds the buttons for routing to different subpages.
*/
export default function Home() {
    return (
        <div>
            <Link to="/search_city">
                <button>search by city</button>
            </Link>
            <Link to="/search_country">
                <button>search by country</button>
            </Link>
        </div>
    )
}
