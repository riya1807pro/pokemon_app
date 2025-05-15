import React from "react";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.h1
      className="text-4xl font-bold text-center text-indigo-700 my-4"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      Pokémon Explorer
    </motion.h1>
  );
}
