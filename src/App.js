import pokeball from "./Pokeball.png";
import loading from "./Loading.png";
import filler3d from "./filler3d.png";
import Pokemon from "./Pokemon.js";
import loadPokemonData from "./Load.js";
import getSprite from "./GetSprite";
import "./App.css";
import "./Pokemon.js";
import { useEffect, useState } from "react";
import loadSprites from './LoadSprite.js';

function App() {
  const [pokemonAPIResponse, setPokemonAPIResponse] = useState([]); // [0: {name:..., url...}]
  const [allPokemons, setAllPokemons] = useState([]); // ['bulbasaur', 'ivysaur', 'venusaur']
  const [allURLs, setAllURLs] = useState([]); // ['url', 'url', 'url']
  const [query, setQuery] = useState(""); // string
  const [displayCount, setDisplayCount] = useState(18); // number
  const [sprites, setSprites] = useState({}); // ['url', 'url', 'url']

  useEffect(() => {
    loadPokemonData().then((response) => {
      setPokemonAPIResponse(response);
      setAllPokemons(response.map((data) => data.name));
      setAllURLs(response.map((data) => data.url));
    });
    loadSprites().then((response) => {
      setSprites(response);
    })
  }, []);

  return (
    <>
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
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
            className="search"
          />
          <div className="display-container">
            <ul className="search-results">
              {allPokemons
                .filter((pokemon) => pokemon.includes(query))
                .map((name, id) => (
                  <li key={id} className="search-results-item">
                    {sprites[name] != null ? <img className="icon" src={sprites[name]}></img> : <img className="icon" src={loading}></img>}
                    <span className="pokemon-result">
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </span>
                  </li>
                ))
                .slice(0, displayCount)}
            </ul>
            <div className="model-container">
              <img className="model" src={filler3d}></img>
              <p className="model-name">
                Chansey <span className="model-id">#113</span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
