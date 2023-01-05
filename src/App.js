import pokeball from './Pokeball.png';
import Pokemon from './Pokemon.js';
import Load from './Load.js';
import './App.css';
import './Pokemon.js';

function App() {
  return (
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
        <img src={pokeball}></img>
      </section>
      <Load></Load>
    </div>
  );
}

export default App;