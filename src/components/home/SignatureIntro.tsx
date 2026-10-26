"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";

// L'animation elle-même est en CSS (.intro dans globals.css) : elle démarre avant JavaScript.
// Ici : passer au clic ou à Échap, et ne la jouer qu'une fois par session.
const DURATION = 1900;

function markSeen() {
  document.documentElement.dataset.intro = "off";
}

export function SignatureIntro({ alt }: { alt: string }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem("andy-intro", "1");
    } catch {}
    const finish = () => {
      markSeen();
      setDone(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    const timer = window.setTimeout(finish, DURATION);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (done) return null;

  return (
    <div
      aria-hidden
      className="intro"
      onClick={() => {
        markSeen();
        setDone(true);
      }}
    >
      <span className="intro__flash" />
      <Logo variant="signature" alt={alt} className="intro__mark" preload />
    </div>
  );
}
