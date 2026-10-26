"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { useFinePointer } from "@/lib/use-media-query";

/**
 * Petit point qui suit la souris. Sur un élément `data-cursor="Play"`, il s'ouvre et affiche le mot.
 * Uniquement sur pointeur fin (souris, trackpad).
 */
export function Cursor() {
  const fine = useFinePointer();
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 700, damping: 45, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 700, damping: 45, mass: 0.3 });

  useEffect(() => {
    if (!fine) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const target = e.target instanceof Element ? e.target.closest("[data-cursor]") : null;
      setLabel(target?.getAttribute("data-cursor") ?? null);
    };
    const leave = () => {
      x.set(-100);
      y.set(-100);
    };
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [fine, x, y]);

  if (!fine) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className={cn("pointer-events-none fixed top-0 left-0 z-[90]", !label && "mix-blend-difference")}
    >
      <motion.div
        animate={{ width: label ? 76 : 8, height: label ? 76 : 8 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="grid -translate-x-1/2 -translate-y-1/2 place-items-center overflow-hidden rounded-full bg-white"
      >
        {label && <span className="type-mono text-[0.625rem] text-black">{label}</span>}
      </motion.div>
    </motion.div>
  );
}
