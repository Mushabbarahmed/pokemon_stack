// src/components/PokemonCard.jsx

import React from 'react';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-full h-32 object-contain"
      />
      <h2 className="text-xl font-bold mt-2">
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </h2>
      
      {/* Display Pokémon types */}
      <div className="flex flex-wrap mt-2">
        {pokemon.types.map((typeInfo) => (
          <span
            key={typeInfo.type.name}
            className={`inline-block text-white text-sm font-semibold px-2 py-1 rounded mr-1 ${getTypeColor(typeInfo.type.name)}`}
          >
            {typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)}
          </span>
        ))}
      </div>

      {/* Display other stats */}
      <p className="mt-2">Base Experience: {pokemon.base_experience}</p>
      <p className="mt-2">HP: {pokemon.stats[0].base_stat}</p>
      <p className="mt-2">Attack: {pokemon.stats[1].base_stat}</p>
      <p className="mt-2">Defense: {pokemon.stats[2].base_stat}</p>
    </div>
  );
};

// Function to get the background color based on Pokémon type
const getTypeColor = (type) => {
  switch (type) {
    case 'fire':
      return 'bg-red-600';
    case 'water':
      return 'bg-blue-600';
    case 'grass':
      return 'bg-green-600';
    case 'electric':
      return 'bg-yellow-600';
    case 'psychic':
      return 'bg-purple-600';
    case 'ice':
      return 'bg-teal-600';
    case 'bug':
      return 'bg-emerald-600';
    case 'dark':
      return 'bg-gray-800';
    case 'fairy':
      return 'bg-pink-600';
    case 'fighting':
      return 'bg-red-800';
    case 'rock':
      return 'bg-brown-600';
    case 'ghost':
      return 'bg-indigo-600';
    case 'dragon':
      return 'bg-orange-600';
    case 'normal':
      return 'bg-gray-400';
    case 'poison':
      return 'bg-purple-800';
    case 'ground':
      return 'bg-yellow-800';
    case 'steel':
      return 'bg-gray-300';
    default:
      return 'bg-gray-500';
  }
};

export default PokemonCard;
