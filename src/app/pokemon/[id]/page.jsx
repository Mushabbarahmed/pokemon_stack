// src/app/pokemon/[id]/page.jsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const PokemonDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPokemonDetails();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto text-center p-6">
      <h1 className="text-4xl font-bold mb-6">{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mb-4" />
      <p><strong>Type:</strong> {pokemon.types.map(type => type.type.name).join(', ')}</p>
      <p><strong>Abilities:</strong> {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
      <h2 className="text-2xl mt-4">Stats</h2>
      <ul className="list-disc text-left ml-6">
        <li><strong>HP:</strong> {pokemon.stats[0].base_stat}</li>
        <li><strong>Attack:</strong> {pokemon.stats[1].base_stat}</li>
        <li><strong>Defense:</strong> {pokemon.stats[2].base_stat}</li>
        {/* Add more stats as needed */}
      </ul>
    </div>
  );
};

export default PokemonDetails;
