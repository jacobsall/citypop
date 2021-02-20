import './App.css';
import React from 'react'
import Header from './components/Header.js'
import Home from './components/Home.js'
import Search from './components/Search.js'
import {BrowserRouter as Router, Route} from 'react-router-dom'
/*
    -- App --

    Holds page header and routing.
*/
function App() {
  return (
    <Router>
      <Header>CityPop</Header>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/search_country">
          <Search mode={'COUNTRY'}/>
        </Route>
        <Route path="/search_city">
          <Search mode={'CITY'}/>
        </Route>
    </Router>
  );
}

export default App;
