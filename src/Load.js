async function loadPokemonData(){
    const promise = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=3');
    // const promise = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1154');
    const data = await promise.json();
    return data.results;
}
export { loadPokemonData }