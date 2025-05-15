import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import PokemonCard from "./components/PokemonCard";
import BubbleBackground from "./components/BubbleBackground";
import "./index.css";
import "daisyui";

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const data = await res.json();
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );
        setPokemonList(pokemonDetails);
        setFilteredPokemon(pokemonDetails);
        const allTypes = [
          ...new Set(
            pokemonDetails.flatMap((p) => p.types.map((t) => t.type.name))
          ),
        ];
        setTypes(allTypes);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch Pokémon:", err);
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = pokemonList.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = selectedType
        ? p.types.some((t) => t.type.name === selectedType)
        : true;
      return matchesSearch && matchesType;
    });
    setFilteredPokemon(filtered);
  }, [search, selectedType, pokemonList]);

  return (
    <div className={`min-h-screen transition-colors duration-300 bg-gradient-to-br from-yellow-100 via-pink-100 to-indigo-100 dark:from-gray-900 dark:via-indigo-900 dark:to-black`}>
      <BubbleBackground />
      <div className="flex justify-between items-center p-4">
        <Header />
      
      </div>

      {/* Fun Pokémon Fact Banner */}
      <div className="mx-auto max-w-2xl my-4">
        <div className="bg-gradient-to-r from-pink-300 via-yellow-200 to-indigo-200 rounded-xl shadow-lg px-6 py-3 text-center font-semibold text-indigo-800 dark:text-yellow-100 dark:bg-gradient-to-r dark:from-indigo-900 dark:via-indigo-700 dark:to-pink-900 animate-pulse">
          Did you know? Pikachu was not originally the mascot of Pokémon—Clefairy was!
        </div>
        <div className="mt-2 bg-gradient-to-r from-green-200 via-blue-100 to-purple-200 rounded-xl shadow px-6 py-2 text-center font-semibold text-purple-700 dark:text-green-100 dark:bg-gradient-to-r dark:from-purple-900 dark:via-blue-900 dark:to-green-900 animate-bounce">
          Fun fact: Rhydon was the first Pokémon ever created!
        </div>
      </div>

      <SearchBar
        search={search}
        setSearch={setSearch}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        types={types}
        suggestions={pokemonList.map((p) => p.name)}
      />

      {error ? (
        <div className="text-red-500 text-center mt-4">Error loading data.</div>
      ) : loading ? (
        <div className="text-center text-lg animate-pulse mt-10">Loading Pokémon...</div>
      ) : filteredPokemon.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">No Pokémon found.</div>
      ) : (
        <motion.div
          className="p-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence>
            {filteredPokemon.map((pokemon, index) => (
              <motion.div
                key={pokemon.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.03 }}
                viewport={{ once: true }}
              >
                <PokemonCard pokemon={pokemon} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
