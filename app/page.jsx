"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const Home = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    fetchPokemon();
  }, [offset, limit, searchTerm]);

  const fetchPokemon = async () => {
    try {
      const response = await axios.get(`/api/pokemon`, {
        params: { limit, offset, search: searchTerm },
      });
      setPokemonData(response.data.results || [response.data]);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setOffset(0);
    fetchPokemon();
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-lg shadow-lg">
      <h1 className="text-5xl font-extrabold text-center text-white mb-8 drop-shadow-md">
        Pokémon List
      </h1>

      <form onSubmit={handleSearch} className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search Pokémon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner"
          />
          <svg
            className="absolute left-3 top-3 h-6 w-6 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 11a4 4 0 114 4H7a5 5 0 100-10h2m-2 0h2"
            />
          </svg>
        </div>
        <button
          type="submit"
          className="px-5 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Search
        </button>
      </form>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemonData.map((pokemon, index) => (
          <li
            key={index}
            className="bg-white shadow-lg rounded-lg p-5 transform hover:-translate-y-2 transition-transform duration-300 hover:bg-gray-50"
          >
            <Link
              href={`/${pokemon.name}`}
              className="text-lg font-semibold text-center block text-blue-700 hover:text-blue-900"
            >
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => setOffset((prev) => prev - limit)}
          disabled={offset === 0}
          className={`px-5 py-3 bg-gray-300 text-gray-600 rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 ${
            offset === 0 ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => setOffset((prev) => prev + limit)}
          className="px-5 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
