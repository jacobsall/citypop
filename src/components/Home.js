import React from 'react'
import {Link} from 'react-router-dom'
import PublicIcon from '@material-ui/icons/Public';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import '../css/Home.css'

/*
    -- Home --

    Home page component. Holds the buttons for routing to different subpages.
*/
export default function Home() {
    return (
        <div className="homeContainer">
            <Link to="/search_city" className="link">
                <button className="modeButton">SEARCH BY CITY <LocationCityIcon/> </button>
            </Link>
            <Link to="/search_country" className="link">
                <button className="modeButton">SEARCH BY COUNTRY <PublicIcon/> </button>
            </Link>
        </div>
    )
}
