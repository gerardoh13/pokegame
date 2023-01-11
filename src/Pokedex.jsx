import React from "react";
import Pokecard from "./Pokecard";

function Pokedex(props) {
    return (
      <>
        <div className="Pokecards row">
          {props.pokemon.map(p => (
            <Pokecard
            key={p.id}
              sprite={p.sprite}
              name={p.name}
              type={p.type}
              exp={p.base_experience}
            />
          ))}
        </div>
        {props.isWinner ? <h1>THIS HAND WINS!</h1> : null}
      </>

    );
  }

  export default Pokedex;
