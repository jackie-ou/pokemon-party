import pokeball from './Pokeball.png';
import Pokemon from './Pokemon.js';
import { loadPokemonData } from './Load.js';
import './App.css';
import './Pokemon.js';
import {uesEffect, useEffect, useState} from 'react';

function App() {
  const [pokemonAPIResponse, setPokemonAPIResponse] = useState(undefined);
  
  useEffect(() =>{
    loadPokemonData().then(response => setPokemonAPIResponse(response));
    console.log(pokemonAPIResponse);
  }, []);

  // For each pokemon, store name in array
  // const pokedex = pokemonAPIResponse.map(data => data.name);
  // console.log(pokedex);

  return (
    <div className="container">
      <section className="red-container">
        <ul id="party">
          <Pokemon></Pokemon>
          <Pokemon></Pokemon>
          <Pokemon></Pokemon>
          <Pokemon></Pokemon>
          <Pokemon></Pokemon>
          <Pokemon></Pokemon>
        </ul>
      </section>
      <section className="blue-container">
        <img src={pokeball}></img>
      </section>
    </div>
  );
}

export default App;