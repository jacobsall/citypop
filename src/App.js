import './App.css';
import React from 'react'
import Header from './components/Header.js'
import Home from './components/Home.js'
import CountrySearch from './components/CountrySearch.js'
import CitySearch from './components/CitySearch.js'
import {BrowserRouter as Router, Route} from 'react-router-dom'


function App() {
  return (
    <Router>
      <Header>CityPop</Header>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/search_country">
          <CountrySearch/>
        </Route>
        <Route path="/search_city">
          <CitySearch/>
        </Route>
    </Router>
  );
}

export default App;
