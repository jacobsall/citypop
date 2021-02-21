import {React, Component} from 'react'
import { CircularProgress } from "@material-ui/core";
import axios from 'axios'
import ErrorBox from "./ErrorBox"
import CityResult from "./CityResult"
import CountryResult from "./CountryResult"
import PublicIcon from '@material-ui/icons/Public';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import '../css/Search.css'
import countryCodes from '../data/countries.json'
/*
    -- Search --

    Can be used to search either cities or countries through searchMode prop.
    Displays textfield and button for searching per default.
    Succesful search displays CityResult or CountryResult, hides part mentioned above.
    Shows circular loading bar while fetching data.
    ErrorBox with error message is shown if errors are encountered.
*/
export default class Search extends Component {
    constructor(props){
        super()
        this.state = {
            searchMode: props.mode,
            searchPhrase: '',
            error: false,
            errorMessage:  '',
            cityPop: '',
            cityName: '',
            cities: [],
            showResult: false,
        }
    }

    /* Performs a search on the geonames API */
    search=()=>{
        if (this.testSearchPhrase()) {
            let errorMessage = "Please enter a " + this.state.searchMode.toLowerCase()
            this.setState({
                error: true,
                errorMessage: errorMessage
            })
        }
        else{ // Search phrase is not empty; fetch data from the API.
            // Display loading and remove ErrorBox
            this.setState({
                error: false,
                isLoading: true
            })
            
            // URL for City Search
            let url = "http://api.geonames.org/searchJSON?q=" + this.state.searchPhrase + "&username=weknowit&orderby=population&cities=cities500&maxRows=1"

            /* 
                Modify search parameters for CountrySearch to only work for actual countries.
                Lookup using countries.json, containing countries and matching ISO 3166-1 codes.
                Makes API fetch using the country code instead of the search phrase.
            */
            if(this.state.searchMode === "COUNTRY"){
                let country = countryCodes.find(item => item.Name.toLowerCase() === this.state.searchPhrase.toLowerCase())
                let countryCode = (country !== undefined) ? country.Code : undefined
                url = "http://api.geonames.org/searchJSON?country=" + countryCode +  "&username=weknowit&orderby=population&cities=cities500&maxRows=3"
            }

            
            // Fetching data from geonames API. Responses are ordered by population
            axios.get(url)
                .then(response => {
                    let data = response.data.geonames
                    // Sets states necessary for a city search
                    if (this.validateCityResult(data)){
                        this.setState({
                            cityPop: data[0].population,
                            cityName: data[0].name,
                            showResult: true,
                            isLoading: false
                        })
                    }
                    // Sets states neccessary for a country search
                    else if (this.validateCountryResult(data)){
                            this.setState({
                                cities: data,
                                showResult: true,
                                isLoading: false
                            })
                    }
                    // Error handling for response data being empty
                    else{
                        let errorMessage = "Invalid " + this.state.searchMode.toLowerCase() + ", please try again."
                        this.setState({
                            error: true,
                            errorMessage: errorMessage,
                            isLoading: false
                        })
                    }
                })
        }
    }

    /* 
        Checks that a valid city search has been made. Response data has to exist and searchMode CITY.
        Makes sure that the name of the fetched city complies with the search phrase.
    */
    validateCityResult=(data)=>{
        return data.length > 0 && this.state.searchMode === 'CITY' && data[0].name.toLowerCase() === this.state.searchPhrase.toLowerCase()
    }

    /* Checks that a valid country search has been made. Response data has to exist and searchMode COUNTRY.*/
    validateCountryResult=(data)=>{
        return data.length > 0 && this.state.searchMode === 'COUNTRY'
    }

    /* Test empty search phrase and only whitespaces or special signs */
    testSearchPhrase=()=>{
        let isEmpty = this.state.searchPhrase === "" 
        let illegalCharacters = this.state.searchPhrase.replace(/[^\w\s+]/g, '').length === 0
        return isEmpty || illegalCharacters
    }

    /* Save input from the text field to state */
    saveInput=(e)=>{
        this.setState({
            searchPhrase: e.target.value
        })
    }

    /* Enables pressing the enter key in text field to search */
    handleKeyDown=(e)=>{
        if (e.keyCode === 13) {
            this.search()
          }
    }

    /* Default view. Shows text field and button for searching. */
    searchField=()=>{
        return(
        <div className="searchContainer">
            <h2 className="searchTitle">SEARCH BY {this.state.searchMode} {this.state.searchMode==='CITY' ? <LocationCityIcon/> : <PublicIcon/>}</h2>
            <div className="wrapper">
                <input 
                    className="input" type="text" 
                    value={this.state.searchPhrase} 
                    onChange={this.saveInput} 
                    placeholder={"Enter a " + this.state.searchMode.toLowerCase() + "..."}
                    onKeyDown={this.handleKeyDown}
                />  
                <button 
                    className="searchButton"
                    onClick={this.search}
                />
            </div>
        </div>
        ) 
    }

    /* Displays fetched data after successful search. Either CityResult or CountryResult depending on search mode. */
    resultField=()=>{
        switch (this.state.searchMode) {
            case 'CITY':
                return <CityResult city={this.state.cityName} pop={this.state.cityPop}/>
            case 'COUNTRY':
                return <CountryResult country={this.state.searchPhrase} cities={this.state.cities}/>
            default:
                break;
        }
    }

    render(){
        return (
            <div className="container">
                {this.state.showResult ? this.resultField() : this.searchField()}
                {this.state.error ? <ErrorBox message={this.state.errorMessage}/> : <></>}
                {this.state.isLoading ? <div className="progress"><CircularProgress/></div> : <></>}
            </div>
        )
    }
}
