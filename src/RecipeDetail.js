import React, { Component } from 'react';
import {
    Card, CardImg, CardBody,
    CardTitle, Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

class RecipeDetail extends Component {
    state = {
        recipe: this.props.recipe,
        editMode: !this.props.recipe || false,
        addMode: this.props.addMode
    };

    toggleEditMode = () => {
        this.setState({ editMode: !this.state.editMode });
        if (this.props.addMode){
            this.props.add(this.state.recipe);
        }
    };

    onPictureChange = event => {
        this.setState({recipe: {...this.state.recipe, picture: event.target.value}})
    } // pour modifier seulmenet l'image

    onNameChange = event => {
        this.setState({recipe: {...this.state.recipe, name: event.target.value}})
    } // pour modifier seulmenet le nom

    onDescriptionChange = event => {
        this.setState({recipe: {...this.state.recipe, description: event.target.value}})
    } // pour modifier seulmenet la desxiptiuon

    render() {
        let { recipe } = this.state;
        return (
            <Card>
                <CardImg top width="100%" src={recipe && recipe.picture} alt="Card image cap" />
                {this.state.editMode && <input value={recipe && recipe.picture} onChange={this.onPictureChange}/>}
        <CardBody>
                    {
                        this.state.editMode ?
                            <input value={recipe && recipe.name} onChange={this.onNameChange}/> :
                            <CardTitle>{recipe.name}</CardTitle>
                    }
                    {
                        this.state.editMode ?
                            <textarea value={recipe && recipe.description} onChange={this.onDescriptionChange}/> :
                            <CardTitle>{recipe && recipe.description}</CardTitle>
                    }
                    { 
                        this.props.recipe && <Button onClick={this.props.delete(recipe.id)}>}<FontAwesomeIcon icon={faTrash} /></Button>
                    }
                    <Button onClick={this.toggleEditMode}><FontAwesomeIcon icon={faPen} /></Button>

                </CardBody>
            </Card>
        );
    }
}

export default RecipeDetail;