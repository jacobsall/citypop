import {React, useState, useRef, Component} from 'react'
import ErrorBox from "./ErrorBox"
import CityResult from "./CityResult"
import axios from 'axios'

/*
    const searchRef = useRef()
    const [searchPhrase, setSearchPhrase] = useState('')
    const [result, setResult] = useState('')

    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [showResult, setShowResult] = useState(false)
*/

export default class CitySearch extends Component {
    state = {
        searchPhrase: '',
        result: '',
        error: false,
        showResult: false
    }
    
    

    search=()=>{
        
        console.log(this.state.searchPhrase)
        this.setState({
            error: false,
            isLoading: true
        })
 
        let url = "http://api.geonames.org/searchJSON?q=" + this.state.searchPhrase + "&username=weknowit&orderby=population&cities=cities500"
        axios.get(url)
            .then(response => {
                let data = response.data.geonames
                
                if(data.length > 0){
                    this.setState({
                        result: data[0].population,
                        showResult: true,
                        isLoading: false
                    })
                    console.log(this.state.result)
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
            <h2>SEARCH BY CITY</h2>
            <input type="text" value={this.state.searchPhrase} onChange={this.saveInput}></input>
            <button onClick={this.search}>Search</button>
        </>
        )
        
    }


    render(){
        return (
            <div>
                {!this.state.showResult ? this.searchField() : <CityResult name={this.state.searchPhrase} population={this.state.result}/>}
                {this.state.error ? <ErrorBox/> : <></>}
                {this.state.isLoading ? <h1>loading...</h1> : <></>}
            </div>
        )
    }
}
