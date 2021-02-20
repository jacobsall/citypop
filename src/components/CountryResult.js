import React, { Component } from 'react'
import CityResult from "./CityResult"
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
            <>
                <h2>{this.props.country}</h2>
                {this.props.cities.map(city =>(
                    <button key={city.geonameId} onClick={()=>this.showPopulation(city.population, city.name)}>
                        {city.name}
                    </button>
                ))}
            </>
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

    render(){
        return (
            <>
            {!this.state.showPop ? this.cityList() : <CityResult city={this.state.cityClicked} pop={this.state.popClicked}/>}
            </>
        )
    }
    
}
