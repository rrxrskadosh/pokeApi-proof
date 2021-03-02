import React, { useEffect, useState } from 'react'
import PokemonThumb from './components/PokemonThumb/pokemonThumb'
import PokemonDetails from './components/PokemonDetails/pokemonDetails'

const App = () => {

  const[allPokemons, setAllPokemons] = useState([])
  const [morePokemons, setMorePokemons] = useState('https://pokeapi.co/api/v2/pokemon?limit=30')
  const [showSidebar, setShowSidebar] = useState(false);

   async function createPokemonObject(results)  {
     let pokemonList = [];
     for(let i = 0; i < results.length; i++){
      const res = await fetch(`${results[i].url}`)
      const data =  await res.json()
      pokemonList = [...pokemonList, data];
     }
    setAllPokemons(currentList => [...currentList, ...pokemonList])
  }

  const getAllPokemons = async () => {
    const res = await fetch(morePokemons)
    const data = await res.json()
    setMorePokemons(data.next)  
    createPokemonObject(data.results)
  }

 useEffect(() => {
  getAllPokemons()
 }, [])

  return (
    <div className="app-container">
      <h1>PokeApi Proof</h1>
      {
        showSidebar && <div>Hello world</div>
      }
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map( (pokemonStats, index) => 
            <PokemonThumb
              key={index}
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
            />)}
          
        </div>
          <button className="more-pokemons" onClick={() => getAllPokemons()}>More Pokemons</button>
      </div>
    </div>
  );
}

export default App;