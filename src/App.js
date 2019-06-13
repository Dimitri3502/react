import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RecipeDetail from './RecipeDetail';
import MOCK from './MOCK'
import Header from './Header';
import Button from 'reactstrap/lib/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class App extends Component {
  state = {
    recipes: MOCK,
    addMode: false
  }

  add = (newRecipe) => {
    this.setState({ 
      recipes: this.state.recipes.concat({...newRecipe, id:this.state.recipes.length +100 }),
      addMode: false
    });
  };

  addMode = () => {
    this.setState({ addMode: !this.state.addMode });
  };

  delete = (id) => () => {
    this.setState({
      recipes: this.state.recipes.filter(item => item.id !== id)
    })
  }
  render() {
    return (

      <div>
        <div>
          <Header />
        </div>
        <div className="container">
          <div className="row">
            {this.state.recipes.map(recipe =>
              <div className="col-md-3">
                <RecipeDetail key={recipe.id} recipe={recipe} delete={this.delete} />
              </div>)}
          </div>
          <div className="col-md-3">
            {
              this.state.addMode ?
                <RecipeDetail addMode={this.addMode} add={this.add}/> :
                <Button onClick={this.addMode}><FontAwesomeIcon icon={faPlus} /></Button>
            }
          </div>
        </div>
      </div>
    );
  }
}
export default App;

