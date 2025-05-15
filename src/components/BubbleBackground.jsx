import React from "react";
import { motion } from "framer-motion";

// Define a palette of soft pastel bubble colors
const bubbleColors = [
  "rgba(251,194,235,0.35)", // pink
  "rgba(166,193,238,0.35)", // blue
  "rgba(255,236,179,0.35)", // yellow
  "rgba(186,230,253,0.35)", // light blue
  "rgba(221,214,254,0.35)", // purple
  "rgba(254,202,202,0.35)", // light red
];

const bubbles = Array.from({ length: 18 });

export default function BubbleBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {bubbles.map((_, i) => {
        // Randomize properties for each bubble
        const size = 40 + Math.random() * 100;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
        const duration = 10 + Math.random() * 10;
        const delay = Math.random() * 5;
        const direction = Math.random() > 0.5 ? 1 : -1; // up or down

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              background: color,
              filter: "blur(1.5px)",
              opacity: 0.6,
            }}
            animate={{
              y: [0, direction * (60 + Math.random() * 80), 0],
              x: [0, direction * (20 + Math.random() * 40), 0],
              opacity: [0.6, 0.3, 0.6],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}