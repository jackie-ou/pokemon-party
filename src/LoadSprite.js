const allSprites = {};
const allSplashes = {};
async function loadSprites() {
  for (let i = 1; i <= 1010; i++) {
    try {
      const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
      const data = await promise.json();
      const pokemon = data.name;
      allSprites[pokemon] = data.sprites.front_default;
      allSplashes[pokemon] = data.sprites.other.home.front_default;
    } catch {
      const pokemon = i;
      allSprites[pokemon] = null;
      allSplashes[pokemon] = null;
    }
  }
  console.log(allSplashes);
  return [allSprites, allSplashes]; // [{name: sprite, name: sprite, name: sprite}, {name: sprite, name: sprite, name: sprite}]
}
export default loadSprites;
