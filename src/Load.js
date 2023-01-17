async function loadPokemonData(){
    const promise = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1010');
    const data = await promise.json();
    return data.results;
}
export default loadPokemonData;