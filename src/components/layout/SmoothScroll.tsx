"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";
import { useReducedMotion } from "@/lib/use-media-query";

/** Défilement doux, coupé si l'utilisateur demande moins d'animations. */
export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.12 });
    return () => lenis.destroy();
  }, [reduced]);

  return null;
}
