// src/app/page.jsx

'use client';

import { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';
import Pagination from '../components/Pagination';
import FilterSort from '../components/FilterSort';

const Home = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState('');
  const [offset, setOffset] = useState(0);
  const [limit] = useState(5); // Set limit to 5
  const [query, setQuery] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchPokemons = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
      const data = await response.json();
      const pokemonsWithDetails = await Promise.all(
        data.results.map(async (poke) => {
          const pokeResponse = await fetch(poke.url);
          return await pokeResponse.json();
        })
      );
      setPokemon(pokemonsWithDetails);
      setFilteredPokemons(pokemonsWithDetails); // Set filteredPokemons initially to all pokemons
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, [offset]);

  const handleSearch = async () => {
    setSearchLoading(true); // Show loading bar for search
    if (query) {
      const filtered = pokemon.filter(p => 
        p.name.toLowerCase() === query.toLowerCase()
      );
      setFilteredPokemons(filtered.length > 0 ? filtered : []); // Set to empty if no matches
    } else {
      setFilteredPokemons(pokemon); // If no query, reset to all Pokémon
    }

    // Keep loading state for at least 3 seconds
    setTimeout(() => {
      setSearchLoading(false);
    }, 3000);
  };

  const handleClearSearch = () => {
    setQuery(''); // Clear the search input
    setFilteredPokemons(pokemon); // Reset to all Pokémon
  };

  const handleFilter = (type) => {
    if (type === 'all') {
      setFilteredPokemons(pokemon); // Show all Pokémon
    } else {
      const filtered = pokemon.filter(p => p.types.some(t => t.type.name === type));
      setFilteredPokemons(filtered.length > 0 ? filtered : []); // Set to empty if no matches
    }
  };

  const handleSort = (criteria) => {
    const sortedPokemons = [...filteredPokemons];
    sortedPokemons.sort((a, b) => {
      if (criteria === 'name') {
        return sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (criteria === 'base_experience') {
        return sortOrder === 'asc'
          ? a.base_experience - b.base_experience
          : b.base_experience - a.base_experience;
      }
      return 0;
    });
    setFilteredPokemons(sortedPokemons);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
  };

  return (
    <div className="container mx-auto text-center p-6 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url('/path-to-your-background-image.jpg')", height: '100vh' }}>
      <h1 className="text-5xl font-bold mb-6 tracking-wide gradient-text shadow-lg">
        Pokemon Explorer
      </h1>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border rounded"
        />
        <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded ml-2">Search</button>
        <button onClick={handleClearSearch} className="px-4 py-2 bg-red-500 text-white rounded ml-2">Clear</button>
      </div>

      {/* Filter Buttons */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Filter by Type:</h2>
        <div className="flex flex-wrap justify-center">
          {['fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'bug', 'dark', 'fairy', 'fighting', 'rock', 'ghost', 'dragon', 'normal', 'poison', 'ground', 'steel'].map(type => (
            <button
              key={type}
              onClick={() => handleFilter(type)}
              className="m-1 px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
          <button onClick={() => handleFilter('all')} className="m-1 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Show All</button>
        </div>
      </div>

      {/* Sorting Buttons */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Sort by:</h2>
        <div className="flex flex-wrap justify-center">
          <button onClick={() => handleSort('name')} className="m-1 px-4 py-2 bg-blue-500 text-white rounded">Name</button>
          <button onClick={() => handleSort('base_experience')} className="m-1 px-4 py-2 bg-green-500 text-white rounded">Base Experience</button>
        </div>
      </div>

      {/* Loading Bar */}
      {(loading || searchLoading) && (
        <div className="loading-bar">
          <div className="progress-bar" />
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {/* Pokémon Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.slice(0, 5).map((poke) => ( // Display only the first 5 Pokémon
            <PokemonCard key={poke.id} pokemon={poke} />
          ))
        ) : (
          <div className="bg-black text-white p-4 rounded-lg">
            <p>Did not match any Pokémon.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination offset={offset} setOffset={setOffset} limit={limit} />
    </div>
  );
};

export default Home;
