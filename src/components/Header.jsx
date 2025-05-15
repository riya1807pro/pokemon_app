import React from "react";
import { motion } from "framer-motion";

export default function Header() {
  return (
<motion.div
  className="flex items-center justify-center gap-4 my-6"
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
>
  <img
    src="/pokemon.jpg"
    alt="Pokémon Logo"
    className="w-16 h-16 rounded-full border-4 border-indigo-300 shadow-lg"
  />
  <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700">
    Pokémon Explorer
  </h1>
</motion.div>


  );
}
