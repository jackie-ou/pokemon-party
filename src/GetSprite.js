import loadSprite from "./LoadSprite.js";

const getSprite = (props) => {
  const pokemonNumber = props.allPokemons.indexOf(props.name);
  const url = props.pokemonAPIResponse[pokemonNumber]["url"];
  loadSprite(url).then((response) => {
    return response.sprites["front_default"];
  });
};
export default getSprite;