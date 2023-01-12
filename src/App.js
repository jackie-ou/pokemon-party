import pokeball from "./Pokeball.png";
import Pokemon from "./Pokemon.js";
import loadPokemonData from "./Load.js";
import "./App.css";
import "./Pokemon.js";
import { useEffect, useState } from "react";

function App() {
    // const [pokemonAPIResponse, setPokemonAPIResponse] = useState(undefined);
    const [allPokemons, setAllPokemons] = useState([]);
    const [displayCount, setDisplayCount] = useState("max"); // number or 'max'
    const [query, setQuery] = useState("");

    useEffect(() => {
        loadPokemonData().then(response => {
            console.log(response);
            // For each pokemon, store name in array
            setPokemonAPIResponse(response.map(data => data.name));
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
                        onChange={e => setQuery(e.target.value)}
                    />
                    <button
                        onClick={() =>
                            setDisplayCount(
                                Math.min(displayCount + 10, allPokemons.length)
                            )
                        }
                    >
                        Show 10 More
                    </button>
                    <ul className="search-results">
                        {allPokemons
                            .filter(pokemon => pokemon.includes(query))
                            .map((name, id) => (
                                <li key={id} className="search-results-item">
                                    {name}
                                </li>
                            ))
                            .slice(0, displayCount)}
                    </ul>
                    <img src={pokeball}></img>
                </section>
            </div>
        </>
    );
}

export default App;
