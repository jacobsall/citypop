import {React, useState, useRef, Component} from 'react'
import ErrorBox from "./ErrorBox"
import CityResult from "./CityResult"
import CountryResult from "./CountryResult"
import axios from 'axios'

export default class CitySearch extends Component {
    constructor(props){
        super()
        this.state = {
            searchMode: props.mode,
            searchPhrase: '',
            cityPop: '',
            cities: [],
            error: false,
            showResult: false,
        }
    }

    search=()=>{
        console.log(this.state.searchPhrase)
        this.setState({
            error: false,
            isLoading: true
        })
 
        let url = "http://api.geonames.org/searchJSON?q=" + this.state.searchPhrase + "&username=weknowit&orderby=population&cities=cities500&maxRows=3"
        axios.get(url)
            .then(response => {
                let data = response.data.geonames
                if(data.length > 0){
                    this.setState({
                        cityPop: data[0].population,
                        cities: data,
                        showResult: true,
                        isLoading: false
                    })
                }
                else{
                    this.setState({
                        error: true,
                        isLoading: false
                    })
                }
            })
    
    }

    saveInput=(e)=>{
        this.setState({
            searchPhrase: e.target.value
        })
    }

    searchField=()=>{
        return(
        <>
            <h2>SEARCH BY {this.state.searchMode}</h2>
            <input type="text" value={this.state.searchPhrase} onChange={this.saveInput}></input>
            <button onClick={this.search}>Search</button>
        </>
        ) 
    }

    resultField=()=>{
        switch (this.state.searchMode) {
            case 'CITY':
                return <CityResult city={this.state.searchPhrase} population={this.state.cityPop}/>
            case 'COUNTRY':
                return <CountryResult country={this.state.searchPhrase} cities={this.state.cities}/>
            default:
                break;
        }
    }

    render(){
        return (
            <div>
                {this.state.showResult ? this.resultField() : this.searchField()}
                {this.state.error ? <ErrorBox/> : <></>}
                {this.state.isLoading ? <h1>loading...</h1> : <></>}
            </div>
        )
    }
}
