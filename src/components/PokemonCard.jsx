import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import pokemonFacts, { fallbackFact } from "../data/pokemonFacts";

const typeColors = {
  grass: "bg-green-200 text-green-800",
  fire: "bg-red-200 text-red-800",
  water: "bg-blue-200 text-blue-800",
  bug: "bg-lime-200 text-lime-800",
  normal: "bg-gray-200 text-gray-800",
  electric: "bg-yellow-200 text-yellow-800",
  poison: "bg-purple-200 text-purple-800",
  ground: "bg-yellow-300 text-yellow-900",
  fairy: "bg-pink-200 text-pink-800",
  fighting: "bg-orange-200 text-orange-800",
  psychic: "bg-pink-300 text-pink-900",
  rock: "bg-yellow-400 text-yellow-900",
  ghost: "bg-indigo-200 text-indigo-800",
  dragon: "bg-indigo-400 text-indigo-900",
  ice: "bg-cyan-200 text-cyan-800",
  dark: "bg-gray-700 text-gray-100",
  steel: "bg-gray-300 text-gray-900",
};

export default function PokemonCard({ pokemon }) {
  const [expanded, setExpanded] = useState(false);
  const fact = pokemonFacts[pokemon.name.toLowerCase()] || fallbackFact;

  // Side animation: floating Pokéball
  const Pokeball = () => (
    <motion.div
      className="absolute right-2 top-2 w-8 h-8 opacity-30 pointer-events-none z-0"
      animate={{
        y: [0, 10, 0],
        rotate: [0, 20, -20, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        background: "radial-gradient(circle at 60% 40%, #fff 60%, #e53e3e 61%, #e53e3e 100%)",
        borderRadius: "50%",
        border: "2px solid #222",
      }}
    />
  );

  return (
    <>
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-6 max-w-xs w-full relative"
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
              onClick={e => e.stopPropagation()}
            >
              <motion.img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="mx-auto w-32 h-32 drop-shadow-lg rounded-full border-4 border-white bg-gradient-to-br from-pink-100 via-yellow-100 to-indigo-100"
                animate={{
                  scale: [1, 1.08, 1],
                  rotate: [0, 6, -6, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
              />
              <h2 className="text-2xl font-bold capitalize mt-4 mb-2">{pokemon.name}</h2>
              <div className="flex justify-center gap-2 mt-2 mb-2">
                {pokemon.types.map((t) => (
                  <span
                    key={t.type.name}
                    className={`px-2 py-1 text-xs font-semibold rounded-full shadow ${typeColors[t.type.name] || "bg-gray-200 text-gray-800"}`}
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
              <div className="text-gray-600 text-sm mb-2">ID: {pokemon.id}</div>
              <div className="bg-gradient-to-r from-yellow-200 via-pink-100 to-indigo-100 border border-yellow-300 text-yellow-900 text-xs rounded-lg px-3 py-2 shadow-lg font-semibold animate-pulse mb-2">
                {fact}
              </div>
              <div className="text-gray-700 text-sm">
                <b>Height:</b> {pokemon.height} | <b>Weight:</b> {pokemon.weight}
              </div>
              <button
                className="mt-4 btn btn-sm btn-primary w-full"
                onClick={() => setExpanded(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="relative bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50 p-4 rounded-xl shadow-lg text-center border-4 border-transparent hover:border-pink-300 hover:bg-gradient-to-br hover:from-yellow-100 hover:to-pink-100 transition-all duration-300 cursor-pointer overflow-hidden"
        whileHover={{ scale: 1.08, boxShadow: "0 0 24px #f472b6" }}
        whileTap={{ scale: 0.97, boxShadow: "0 0 24px #f472b6" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onClick={() => setExpanded(true)}
      >
        <Pokeball />
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -top-3 z-10 bg-gradient-to-r from-yellow-200 via-pink-100 to-indigo-100 border border-yellow-300 text-yellow-900 text-xs rounded-lg px-3 py-2 shadow-lg w-56 font-semibold animate-pulse"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {fact}
        </motion.div>
        <h2 className="text-xl font-bold capitalize mt-6 mb-2">{pokemon.name}</h2>
        <motion.img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="mx-auto w-24 h-24 drop-shadow-lg rounded-full border-4 border-white bg-gradient-to-br from-pink-100 via-yellow-100 to-indigo-100"
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, 6, -6, 0],
            boxShadow: [
              "0 0 0px #f472b6",
              "0 0 16px #f472b6",
              "0 0 0px #f472b6"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        />
        <p className="text-gray-600 text-sm mt-2">ID: {pokemon.id}</p>
        <div className="flex justify-center gap-2 mt-2">
          {pokemon.types.map((t) => (
            <span
              key={t.type.name}
              className={`px-2 py-1 text-xs font-semibold rounded-full shadow ${typeColors[t.type.name] || "bg-gray-200 text-gray-800"}`}
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </motion.div>
    </>
  );
}
