import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Header from './Component/Header';
import RecipeList from './Container/RecipeList';
import Tableau from './Container/Tableau';


class App extends Component {

  render() {
    return (
      <Router>
        <div>

          <div>
            <Header />
          </div>
          <Route path="/recipes" component={RecipeList} />
          <Route path="/ingredients" component={Tableau} />
        </div>

      </Router>

    );

  }
}
export default App;

