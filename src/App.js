import React, { useEffect, useState } from 'react'
import PokemonThumb from './components/PokemonThumb/pokemonThumb'
import PokemonDetails from './components/PokemonDetails/pokemonDetails'

const App = () => {

   const[allPokemons, setAllPokemons] = useState([])
   const [morePokemons, setMorePokemons] = useState('https://pokeapi.co/api/v2/pokemon?limit=30')

  const getAllPokemons = async () => {
    const res = await fetch(morePokemons)
    const data = await res.json()

    setMorePokemons(data.next)

    function createPokemonObject(results)  {
      results.forEach( async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data =  await res.json()
        setAllPokemons( currentList => [...currentList, data])
        await allPokemons.sort((a, b) => a.id - b.id)
      })
    }
    createPokemonObject(data.results)
  }

 useEffect(() => {
  getAllPokemons()
 }, [])

  return (
    <div className="app-container">
      <h1>PokeApi Proof</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map( (pokemonStats, index) => 
            <PokemonThumb
              key={index}
              id={pokemonStats.id}
              image={pokemonStats.sprites.other.dream_world.front_default}
              name={pokemonStats.name}
              type={pokemonStats.types[0].type.name}
            />)}
          
        </div>
          <button className="more-pokemons" onClick={() => getAllPokemons()}>More Pokemons</button>
      </div>
    </div>
  );
}

export default App;