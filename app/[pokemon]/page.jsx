"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PokemonDetail = () => {
  const { pokemon } = useParams();
  const [pokemonDetail, setPokemonDetail] = useState(null);

  const getTypeBackground = (type) => {
    const colors = {
      fire: "bg-red-500",
      water: "bg-blue-500",
      grass: "bg-green-500",
      electric: "bg-yellow-500",
      // Add more types as needed
    };
    return colors[type] || "bg-gray-500"; // Default to gray if type is unknown
  };

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        );
        setPokemonDetail(response.data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchPokemonDetail();
  }, [pokemon]);

  if (!pokemonDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-200 p-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">
            {pokemonDetail.name}
          </h1>
          <img
            src={pokemonDetail.sprites.front_default}
            alt={pokemonDetail.name}
            className="mx-auto mt-4 w-40 h-40 object-contain"
          />
        </div>
        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Details</h2>
            <div className="mt-2">
              <p className="text-gray-600">
                <span className="font-bold">Height:</span>{" "}
                {pokemonDetail.height / 10} m
              </p>
              <p className="text-gray-600">
                <span className="font-bold">Weight:</span>{" "}
                {pokemonDetail.weight / 10} kg
              </p>
              <p className="text-gray-600">
                <span className="font-bold">Base Experience:</span>{" "}
                {pokemonDetail.base_experience}
              </p>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Types</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {pokemonDetail.types.map((typeInfo, index) => (
                <li
                  key={index}
                  className={`px-4 py-2 rounded-full text-white font-medium ${getTypeBackground(
                    typeInfo.type.name
                  )}`}
                >
                  {typeInfo.type.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Abilities</h2>
            <ul className="mt-2">
              {pokemonDetail.abilities.map((abilityInfo, index) => (
                <li key={index} className="text-gray-600">
                  {abilityInfo.ability.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
