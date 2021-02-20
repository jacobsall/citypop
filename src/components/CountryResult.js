import React, { Component } from 'react'
import CityResult from "./CityResult"

export default class CountryResult extends Component {
    constructor(props){
        super()
        this.state = {
            showPop: false,
            cityClicked: '',
            popClicked: ''
        }
    }

    cityList=()=>{
        return (
            <>
                <h2>{this.props.country}</h2>
                {this.props.cities.map(city =>(
                    <button key={city.geonameId} onClick={()=>this.showPop(city.population, city.name)}>
                        {city.name}
                    </button>
                ))}
            </>
        )
    }

    showPop=(population, name)=>{
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
