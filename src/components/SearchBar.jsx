import React from "react";
const types = [
  "All", "Grass", "Fire", "Water", "Bug", "Normal", "Electric", "Poison",
  "Ground", "Fairy", "Fighting", "Psychic", "Rock", "Ghost", "Dragon", "Ice"
];

export default function SearchBar({ searchTerm, setSearchTerm, selectedType, setSelectedType }) {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4 p-4 rounded-xl bg-white/80 shadow relative before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-pink-400 before:via-yellow-300 before:to-indigo-400 before:blur-sm before:opacity-40 before:-z-10">
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
      />
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="w-40 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      >
        {types.map((type) => (
          <option key={type}>{type}</option>
        ))}
      </select>
    </div>
  );
}
