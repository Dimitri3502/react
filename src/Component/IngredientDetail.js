import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Button } from 'reactstrap';

class IngredientDetail extends Component {
    state = {
        ingredient: this.props.ingredient,
        editMode: !this.props.ingredient || false,
        addMode: this.props.addMode
    };

    toggleEditMode = () => {
        this.setState({ editMode: !this.state.editMode });
        if (this.props.addMode) {
            this.props.add(this.state.ingredient);
        }
        this.state.editMode && this.props.update(this.state.ingredient);
    };


    onNameChange = event => {
        this.setState({ ingredient: { ...this.state.ingredient, name: event.target.value } });

    } // pour modifier seulmenet le nom



    render() {
        let { ingredient } = this.state;
        return (
            <tr key={ingredient && ingredient.id}>
                <td className="name">
                    {/* {!this.state.editMode && ingredient.name}  */}
                    {
                        this.state.editMode ?
                            <input value={ingredient && ingredient.name} onChange={this.onNameChange} /> :
                            ingredient.name
                    }
                </td>
                <td>
                    <Button onClick={this.toggleEditMode}><FontAwesomeIcon icon={faPen} /></Button>
                    <Button onClick={this.props.delete(ingredient && ingredient.id)}><FontAwesomeIcon icon={faTrash} /></Button>

                </td>
            </tr>
        );
    }
}

export default IngredientDetail;