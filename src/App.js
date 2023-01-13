import pokeball from "./Pokeball.png";
import filler from "./filler.png"
import filler3d from "./filler3d.png"
import Pokemon from "./Pokemon.js";
import loadPokemonData from "./Load.js";
import "./App.css";
import "./Pokemon.js";
import { useEffect, useState } from "react";

function App() {
  const [pokemonAPIResponse, setPokemonAPIResponse] = useState(undefined); // [0: {name:..., url...}]
  const [allPokemons, setAllPokemons] = useState([]); // ['bulbasaur', 'ivysaur', 'venusaur']
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadPokemonData().then((response) => {
      setPokemonAPIResponse(response);
      setAllPokemons(response.map((data) => data.name));
    });
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
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            className="search"
          />
          <div className="idk">
            <ul className="search-results">
              {allPokemons
                .filter((pokemon) => pokemon.includes(query))
                .map((name, id) => (
                  <li key={id} className="search-results-item">
                    <img className="icon" src={filler}></img> 
                    <span className="pokemon-result">{name}</span>
                  </li>
                ))}
            </ul>
            <div className="model-container">
              <img className="model" src={filler3d}></img>
              <p className="model-name">Chansey</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
