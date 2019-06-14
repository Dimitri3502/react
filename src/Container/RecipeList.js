import React, { Component } from 'react';
import { Button } from 'reactstrap';
import RecipeDetail from '../Component/RecipeDetail';
import API from './api';

class RecipeList extends Component {
    state = {
        recipes: [],
        addMode: false,
        isLoading: true,
    }
    componentDidMount() {
        this.getAll();
    }

    getAll() {
        API.get("/recipes")
            .then(result =>
                this.setState({
                    recipes: result.data,
                    isLoading: false,
                })
            )
            // Catch any errors we hit and update the app
            .catch(error => this.setState({ error, isLoading: false }));
    }

    create(recipe) { // le back demande des instruction et des instructions
        API.post('/recipes', {
            ...recipe, "ingredients": [
                {
                    "recipeId": 2,
                    "ingredientId": 1,
                    "name": "Dark rum (Appleton Estate Reserve)",
                    "quantity": 2,
                    "unit": "oz"
                },
                {
                    "recipeId": 2,
                    "ingredientId": 2,
                    "name": "Fresh lime juice",
                    "quantity": 1,
                    "unit": "oz"
                },
                {
                    "recipeId": 2,
                    "ingredientId": 3,
                    "name": "Simple sirup",
                    "quantity": 1,
                    "unit": "oz"
                }
            ],
            "instructions": null
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            }).catch(e => {
                console.log("erreur dans lord de la création");
                console.log(e);
            });
    }

    add = (newRecipe) => {
        this.setState({
            recipes: this.state.recipes.concat({ ...newRecipe, id: this.state.recipes.length + 100 }),
            addMode: false
        });
        console.log(newRecipe);
        this.create(newRecipe);
    };

    addMode = () => {
        this.setState({ addMode: !this.state.addMode });
    };



    delete = (id) => () => {
        console.log(id);
        API.delete(`/recipes${id}`)
        this.setState({
            recipes: this.state.recipes.filter(item => item.id !== id)

        })
    }
    update = (recipe) => {
        API.patch(`/recipes`, recipe).then(response => {
            console.log(response)
        })
    }


    render() {
        return (
            <div>
                <div>
                    <Button onClick={this.props.addMode}>Add new recipe</Button>
                </div>
                <div className="container">
                    <div className="row">
                        {this.state.recipes.map(recipe =>
                            <div className="col-md-3">
                                <RecipeDetail key={recipe.id} recipe={recipe} update={this.update} delete={this.delete} />
                            </div>)}
                    </div>
                    <div className="col-md-3">
                        {
                            this.state.addMode &&
                            <RecipeDetail addMode={this.addMode} add={this.add} update={this.update} />

                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default RecipeList;