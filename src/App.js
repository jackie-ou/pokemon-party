import pokeball from './Pokeball.png';
import Pokemon from './Pokemon.js';
import { loadPokemonData } from './Load.js';
import './App.css';
import './Pokemon.js';
import {useEffect, useState} from 'react';

function App() {
  const [pokemonAPIResponse, setPokemonAPIResponse] = useState(undefined);
  const [userSearch, setUserSearch] = useState('');
  
  useEffect(() =>{
    loadPokemonData().then(response => setPokemonAPIResponse(response));
    // console.log(pokemonAPIResponse);
  }, []);

  useEffect(() =>{
    const form = document.getElementById('userInput').value;
    setUserSearch(form);
    console.log(`User input: ${form}`);
  }, []);

  function getUserInput(){
    // const userSearch = document.getElementById('userInput').value;
    // console.log(`User input: ${userSearch}`);
    // setUserSearch(userSearch);
  }

  let pokedex = [];
  let searchResults = [];

  // For each pokemon, store name in array
  if(pokemonAPIResponse) {
    pokedex = pokemonAPIResponse.map(data => data.name);
    console.log(`Pokedex: ${pokedex}`);
    searchResults = pokedex.filter(pokemon => pokemon.includes(userSearch));
    console.log(`Search results: ${searchResults}`);
  }

  return (
    <>
      <form>
        <input type='text' id='userInput'></input>
      </form>
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
    </>
  );
}

export default App;