import React from 'react';
import './Pokecard.css';

function Pokecard(props) {
  return (
      <div className="Pokecard col-3 card">
        <h2 className="Pokecard-title">{ props.name }</h2>
        <img className="Pokecard-image" src={props.sprite} />
        <div className="Pokecard-data">Type: {props.type}</div>
        <div className="Pokecard-data">EXP: {props.exp}</div>
      </div>
  );
}

export default Pokecard;
