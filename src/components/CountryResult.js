import React, { Component } from 'react'
import CityResult from "./CityResult"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import '../css/CountryResult.css'
/*
    -- CountryResult --

    Default behaviour: Displays three cities as buttons.
    If a city is clicked it instead displays a CityResult for that city.
*/
export default class CountryResult extends Component {
    constructor(props){
        super()
        this.state = {
            showPop: false,
            cityClicked: '',
            popClicked: ''
        }
    }

    /* Default view. Displays buttons for the cities received as props.*/
    cityList=()=>{
        return (
            <div className="cityList">
                <h2>{this.props.country.toUpperCase()}<hr className="divider"/></h2>
                {this.props.cities.map(city =>(
                    <button className="modeButton cityListButton" key={city.geonameId} onClick={()=>this.showPopulation(city.population, city.name)}>
                        {city.name}
                    </button>
                ))}
            </div>
        )
    }

    /* View showing population for clicked city. */
    cityResultView=()=>{
        return(
            <div className="cityResultView">
            <CityResult city={this.state.cityClicked} pop={this.state.popClicked}/>
            <button className="backButton" onClick={this.hidePopulation}><ArrowBackIcon /></button>
            </div>
        )
    }

    /* Changes the view from the list of buttons to CityResult of the clicked city by setting showPop = true */
    showPopulation=(population, name)=>{
        this.setState({
            showPop: true,
            cityClicked: name,
            popClicked: population
        })
    }

    /* Hides the CityResult by setting showPop = false */
    hidePopulation=()=>{
        this.setState({
            showPop: false,
        })
    }

    render(){
        return (
            <>
            {!this.state.showPop ? this.cityList() : this.cityResultView()}
            </>
        )
    }
    
}
