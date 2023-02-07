import pokeball from "./Pokeball.png";
import loading from "./Loading.png";
import mystery from "./mystery.png";
import "./App.css";
import "./Pokemon.js";
import { useEffect, useState } from "react";

import Pokedex from "pokedex-promise-v2";
const P = new Pokedex();

function App() {
  const [query, setQuery] = useState("");
  const [resources, setResources] = useState([]);
  const [displayName, setDisplayName] = useState("bulbasaur");
  const [ApiLookupName, setApiLookupName] = useState("bulbasaur");
  const [flavorText, setFlavorText] = useState("");

  useEffect(() => {
    const pokemonResources = [];
    for (let i = 1; i <= 1010; i++) {
      if (i === 1009 || i === 1010) continue;
      P.getResource(`/api/v2/pokemon/${i}`).then((response) => {
        pokemonResources.push(response); // the getResource function accepts singles or arrays of URLs/paths
      });
    }
    setResources(pokemonResources);
  }, []);

  const getSplash = function (ApiLookupName) {
    const pokemon = resources.filter(
      (response) => response.name === ApiLookupName
    );
    return pokemon[0].sprites.other.home.front_default != null ? pokemon[0].sprites.other.home.front_default : mystery;
  };

  const getId = function (displayName) {
    const pokemon = resources.filter(
      (response) => response.name === displayName
    );
    return pokemon[0] ? pokemon[0].id : 1;
  };

  const getFlavorText = function (displayName) {
    P.getPokemonSpeciesByName(displayName).then((response) => {
      if (response.flavor_text_entries.length === 0) {
        setFlavorText("No entries found.");
      }
      const englishFlavorTexts = response.flavor_text_entries.filter(
        (index) => index.language.name === "en"
      );
      const raw = englishFlavorTexts[englishFlavorTexts.length-1].flavor_text;
      const flavorText = raw.replace("", " ");
      setFlavorText(flavorText);
    });
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
              .filter((pokemon) => pokemon.species.name.toLowerCase().includes(query))
              .map((pokemon) => (
                <li
                  key={pokemon.name}
                  className="search-results-item"
                  onClick={() => {
                    setDisplayName(pokemon.species.name);
                    setApiLookupName(pokemon.name);
                    getFlavorText(pokemon.species.name);
                  }}
                >
                  {resources.length < 10 ||
                  pokemon.sprites.front_default != null ? ( //
                    <img
                      className="icon"
                      src={pokemon.sprites.front_default}
                    ></img>
                  ) : (
                    <img className="icon" src={loading}></img>
                  )}
                  <span className="pokemon-result">
                    {pokemon.species.name.charAt(0).toUpperCase() +
                      pokemon.species.name.slice(1)}
                  </span>
                </li>
              ))
              .slice(0, 10)}
          </ul>
        </div>
        <div className="model-container">
          {resources.length ? (
            <img className="model" src={getSplash(ApiLookupName)}></img>
          ) : (
            <img src={pokeball}></img>
          )}
          <p className="model-name">
            {resources.length
              ? displayName.charAt(0).toUpperCase() + displayName.slice(1)
              : ""}
            <span className="model-id">
              {resources.length ? `#${getId(displayName)}` : ""}
            </span>
          </p>
          <p className="model-flavor-text">{flavorText}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
