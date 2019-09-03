import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: ''
    }
  }

  //state changing callback
  handleSubmit = (event) => {
    console.log("form is changing")
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onChange={this.handleSubmit} onSubmit={ () => {this.props.addPokemon(this.state)} }>
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="Name" name="name" />
            <Form.Input fluid label="hp" placeholder="hp" name="hp" />
            <Form.Input fluid label="Front Image URL" placeholder="url" name="frontUrl" />
            <Form.Input fluid label="Back Image URL" placeholder="url" name="backUrl" />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
