"use client";

import { motion } from "motion/react";
import { type ReactNode, useEffect } from "react";

// Faux au premier chargement : le rideau ne joue que lors des navigations internes,
// pour ne jamais masquer la page avant que JavaScript soit prêt.
let hasNavigated = false;

/** Transition de page en « coupe » : un rideau noir rapide qui s'ouvre sur la nouvelle page. */
export default function Template({ children }: { children: ReactNode }) {
  const play = hasNavigated;

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <>
      {play && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[70] bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.7, 0, 0.2, 1] }}
        />
      )}
      {children}
    </>
  );
}
