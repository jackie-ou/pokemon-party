import pokeball from "./Pokeball.png";
import loading from "./Loading.png";
import "./App.css";
import "./Pokemon.js";
import { useEffect, useState } from "react";

import Pokedex from "pokedex-promise-v2";
const P = new Pokedex();

function App() {
  const [query, setQuery] = useState("");
  const [resources, setResources] = useState([]);
  const [displayName, setDisplayName] = useState(null);

  useEffect(() => {
    const pokemonResources = [];
    for (let i = 1; i <= 1010; i++) {
      if(i === 1009 || i === 1010) continue;
      P.getResource(`/api/v2/pokemon/${i}`).then((response) => {
        pokemonResources.push(response); // the getResource function accepts singles or arrays of URLs/paths
      });
    }
    setResources(pokemonResources);
    setDisplayName("bulbasaur");
  }, []);

  const getSplash = function (displayName) {
    const pokemon = resources.filter(
      (response) => response.name === displayName
    );
    return pokemon[0].sprites.other.home.front_default;
  };

  const getId = function (displayName) {
    const pokemon = resources.filter(
      (response) => response.name === displayName
    );
    return pokemon[0] ? pokemon[0].id : 1;
  };

  return (
    <div className="container">
      <div className="blue-container">
        <div className="menu">
          <input
            type="text"
            placeholder="Start searching..."
            className="search"
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
          <ul className="search-results">
            {resources
              .filter((pokemon) => pokemon.name.toLowerCase().includes(query))
              .map((pokemon) => (
                <li
                  key={pokemon.name}
                  className="search-results-item"
                  onClick={() => {
                    setDisplayName(pokemon.name);
                  }}
                >
                  {(resources.length < 10 || pokemon.sprites.front_default != null) ? (
                    <img
                      className="icon"
                      src={pokemon.sprites.front_default}
                    ></img>
                  ) : (
                    <img className="icon" src={loading}></img>
                  )}
                  <span className="pokemon-result">
                    {pokemon.name.charAt(0).toUpperCase() +
                      pokemon.name.slice(1)}
                  </span>
                </li>
              ))
              .slice(0, 10)}
          </ul>
        </div>
        <div className="model-container">
          {resources.length ? (
            <img className="model" src={getSplash(displayName)}></img>
          ) : (
            <img src={pokeball}></img>
          )}
          <p className="model-name">
            {resources.length ? displayName.charAt(0).toUpperCase() + displayName.slice(1) : ''}
            <span className="model-id">
              {resources.length ? `#${getId(displayName)}`: ''}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
