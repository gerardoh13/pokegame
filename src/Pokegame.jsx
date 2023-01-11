import React from "react";
import axios from "axios";
import Pokedex from "./Pokedex";

class Pokegame extends React.Component {
  state = {
    pokeIds: [],
    hand1: [],
    hand2: [],
    gameIsOn: false,
    winner: "",
  };
  async componentDidMount() {
    await this.getPokeIds();
    await this.getPokemon();
  }

  getPokeIds = () => {
    let arr = [];
    while (arr.length < 8) {
      let id = Math.floor(Math.random() * 150) + 1;
      if (arr.includes(id)) {
        continue;
      }
      arr.push(id);
    }
    this.setState({
      pokeIds: [...arr],
    });
  };

  async getPokemon() {
    let arr = [];
    for (let pId of this.state.pokeIds) {
      let pokeRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pId}`);
      let { id, base_experience, name } = pokeRes.data;
      let type = pokeRes.data.types[0].type.name;
      let sprite = pokeRes.data.sprites.front_default;
      let pokemon = { id, base_experience, name, type, sprite };
      arr.push(pokemon);
    }
    this.setState({ hand1: [...arr] });
  }

  startGame = async () => {
    let hand1 = [...this.state.hand1];
    let hand2 = [];
    while (hand1.length > hand2.length) {
      let randIdx = Math.floor(Math.random() * hand1.length);
      let randPokemon = hand1.splice(randIdx, 1)[0];
      hand2.push(randPokemon);
    }
    await this.setState({
      hand1: [...hand1],
      hand2: [...hand2],
      gameIsOn: true,
      winner: "",
    });
    this.getWinner();
  };

  restart = async () => {
    await this.getPokeIds();
    await this.getPokemon();
    this.setState({
      gameIsOn: false,
      hand2: [],
      winner: "",
    });
  };

  getWinner = () => {
    let exp1 = this.state.hand1.reduce(
      (exp, pokemon) => exp + pokemon.base_experience,
      0
    );
    let exp2 = this.state.hand2.reduce(
      (exp, pokemon) => exp + pokemon.base_experience,
      0
    );
    let winningHand = exp1 > exp2 ? "hand1" : "hand2";
    this.setState({
      winner: winningHand,
    });
  };
  render() {
    return (
      <>
        <h1>{this.state.gameIsOn ? "Pokemon Battle!" : "Pokedex"}</h1>
        <Pokedex
          pokemon={this.state.hand1}
          isWinner={"hand1" === this.state.winner}
        />
        {this.state.gameIsOn ? (
          <>
            <hr />
            <h2 style={{ color: "yellow" }}>VS</h2>
            <hr />
            <Pokedex
              pokemon={this.state.hand2}
              isWinner={"hand2" === this.state.winner}
            />
          </>
        ) : null}
        {this.state.gameIsOn ? (
          <button className="btn btn-success" onClick={this.restart}>
            New Pokemon
          </button>
        ) : (
          <button className="btn btn-danger" onClick={this.startGame}>
            Battle!
          </button>
        )}
      </>
    );
  }
}

export default Pokegame;
