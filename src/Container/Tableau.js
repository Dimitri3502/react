import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';
import IngredientDetail from '../Component/IngredientDetail';
import API from './api';

export default class Tableau extends Component {
  state = {
    ingredients: [],
    addMode: false,
    isLoading: true
  };

  componentDidMount() {
    API.get("/ingredients")
      .then(result =>
        this.setState({
          ingredients: result.data,
          isLoading: false,
        }
        ))
  }

  delete = (id) => () => {
    console.log(id);
    API.delete(`/ingredients/${id}`)
    this.setState({
      ingredients: this.state.ingredients.filter(item => item.id !== id)

    })
}
update = (ingredient) => {
    API.patch(`/ingredients/`, ingredient).then(response => {
        console.log(response)
    })
}

toggleAddMode() {
  this.setState({
      addMode: !this.state.addMode
  });
}
  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>name</th>
            <th>edit</th>
          </tr>
        </thead>
        <tbody>
          {this.state.ingredients.map(ingredient => (

            <IngredientDetail key={ingredient.id} ingredient={ingredient} update={this.update} delete={this.delete} />
          ))
          }
        </tbody>
        {
          this.state.addMode ? 
          <IngredientDetail delete={this.delete} addMode={this.state.addMode} add={this.add} update={this.update}/>

          :<Button onClick={this.toggleAddMode}>Add new recipe</Button>
        }
        
      </Table>
    );
  }
}