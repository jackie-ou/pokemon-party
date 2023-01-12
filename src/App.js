import pokeball from "./Pokeball.png";
import Pokemon from "./Pokemon.js";
import loadPokemonData from "./Load.js";
import "./App.css";
import "./Pokemon.js";
import { useEffect, useState } from "react";

function App() {
  const [pokemonAPIResponse, setPokemonAPIResponse] = useState(undefined);
  const [query, setQuery] = useState("");

  useEffect(()=>{
    loadPokemonData().then((response) => {
      console.log(response);
      setPokemonAPIResponse(response);
    })
  }, []);



  let pokedex = [];

  // For each pokemon, store name in array
  if (pokemonAPIResponse) {
    pokedex = pokemonAPIResponse.map((data) => data.name);
    console.log(`Pokedex: ${pokedex}`);
  }

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
          />
          <ul className="search-results">
            {pokedex.filter((pokemon) =>
              pokemon.includes(query)).map((name, id) => (
                <li key={id} className="search-results-item">
                  {name}
                </li>
              ))
            }
          </ul>
          <img src={pokeball}></img>
        </section>
      </div>
    </>
  );
}

export default App;
