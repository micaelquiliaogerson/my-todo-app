"use client";

import { gql, useQuery } from "@apollo/client";
import Image from 'next/image';

const GET_POKEMONS = gql`
  query {
    pokemons(first: 5) {
      id
      name
      image
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_POKEMONS);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Pokémons</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {data.pokemons.map((pokemon: { id: string; name: string; image: string }) => (
            <div key={pokemon.id}>
              <Image src={pokemon.image} alt={pokemon.name} width={80} height={80} className="w-20 h-20" />
              <p className="text-lg font-semibold">{pokemon.name}</p>
            </div>
        ))}
      </div>
    </div>
  );
}
