const loadAPI = async () => {
    try{
        // Fetch API which returns [name : url]
        let response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=2');
        let data = response.json().then((obj) => {
            console.log(obj.results);
            return obj.results;
        });
    } catch (e) {
        console.log("Could not fetch API", e);
    }
};

function Load() {
    return (
        <button onClick={loadAPI} id="temp">Load JSON</button>
    );
}
export default Load;
