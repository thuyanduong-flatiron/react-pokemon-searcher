import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonIndex extends React.Component {
  state = {
    pokemonCollection: [],
    searchTerm: ''
  }

  componentDidMount() {
    fetch('http://localhost:3000/pokemon')
      .then(res => res.json())
      .then(pokemonCollection => this.setState({ pokemonCollection: pokemonCollection }))
      .catch(e => console.error(e))
  }

  //function tied to the event listener
  addPokemon = (pokemon) => {
    let pokemonObj = {
      name: pokemon.name,
      sprites: {front: pokemon.frontUrl, back: pokemon.backUrl},
      stats:[{name: 'hp', value: pokemon.hp}]
    }

    //update the back end
    fetch('http://localhost:3000/pokemon', {
      method: "POST",
      headers: {"Content-Type": "application/json", "Accept": "application/json"},
      body: JSON.stringify(pokemonObj)
    })
    .then(res => res.json())
    .then(data => {
      //updating the front end
      this.setState({  pokemonCollection: [...this.state.pokemonCollection, data]  })
    })
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ searchTerm: value })
  }

  toggleImage = pokemon => {
    const col = this.state.pokemonCollection
    const i = col.indexOf(pokemon)
    this.setState({
      pokemonCollection: [
        ...col.slice(0, i),
        // initially pokemon.isClicked is undefined; inverting that falsey value makes it true
        { ...pokemon, isClicked: !pokemon.isClicked },
        ...col.slice(i + 1)
      ]
    })
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce(() => console.log('🤔'), 500)} showNoResults={false} />
        <br />
        <PokemonCollection
          pokemons={this.state.pokemonCollection}
        />
        <br />
        <PokemonForm
          addPokemon={this.addPokemon}
        />
      </div>
    )
  }
}

export default PokemonIndex
