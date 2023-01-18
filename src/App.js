import pokeball from "./Pokeball.png";
import loading from "./Loading.png";
import filler3d from "./filler3d.png";
import Pokemon from "./Pokemon.js";
import loadPokemonData from "./Load.js";
import getSprite from "./GetSprite";
import "./App.css";
import "./Pokemon.js";
import { useEffect, useState } from "react";
import loadSprites from "./LoadSprite.js";

function App() {
  const [pokemonAPIResponse, setPokemonAPIResponse] = useState([]); // [0: {name:..., url...}]
  const [allPokemons, setAllPokemons] = useState([]); // ['bulbasaur', 'ivysaur', 'venusaur']
  const [allURLs, setAllURLs] = useState([]); // ['url', 'url', 'url']
  const [query, setQuery] = useState(""); // string
  const [displayCount, setDisplayCount] = useState(10); // number
  const [sprites, setSprites] = useState({}); // ['url', 'url', 'url']
  const [splash, setSplashes] = useState({}); // ['url', 'url', 'url']
  const [displayName, setDisplayName] = useState("bulbasaur"); // 'bulbasaur'

  useEffect(() => {
    loadPokemonData().then((response) => {
      setPokemonAPIResponse(response);
      setAllPokemons(response.map((data) => data.name));
      setAllURLs(response.map((data) => data.url));
    });
    loadSprites().then((response) => {
      const [responseSprite, responseSplash] = response;
      setSprites(responseSprite);
      setSplashes(responseSplash);
    });
  }, []);

  return (
    <>
      <div className="container">
        {/* <section className="red-container">
          <ul id="party">
            <Pokemon></Pokemon>
            <Pokemon></Pokemon>
            <Pokemon></Pokemon>
            <Pokemon></Pokemon>
            <Pokemon></Pokemon>
            <Pokemon></Pokemon>
          </ul>
        </section> */}
        <section className="blue-container">
          <div className="menu">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
              className="search"
            />
            <ul className="search-results">
              {allPokemons
                .filter((pokemon) => pokemon.includes(query))
                .map((name, id) => (
                  <li
                    key={id}
                    className="search-results-item"
                    onClick={() => {
                      setDisplayName(name);
                    }}
                  >
                    {sprites[name] != null ? (
                      <img className="icon" src={sprites[name]}></img>
                    ) : (
                      <img className="icon" src={loading}></img>
                    )}
                    <span className="pokemon-result">
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </span>
                  </li>
                ))
                .slice(0, displayCount)}
            </ul>
          </div>
          <div className="model-container">
            {sprites[displayName] != null ? (
              <img className="model" src={splash[displayName]}></img>
            ) : (
              <img className="icon" src={loading}></img>
            )}
            <p className="model-name">
              {displayName &&
                displayName.charAt(0).toUpperCase() + displayName.slice(1)}
              <span className="model-id">#113</span>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
