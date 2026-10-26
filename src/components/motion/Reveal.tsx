"use client";

import { type CSSProperties, useCallback } from "react";
import { cn } from "@/lib/cn";

/** Titre révélé ligne par ligne quand il entre dans le cadre (voir .reveal dans globals.css). */
export function Reveal({
  lines,
  as: Tag = "p",
  className,
  id,
}: {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  id?: string;
}) {
  const ref = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} id={id} className={cn("reveal", className)}>
      {lines.map((line, i) => (
        <span key={i} className="reveal-line">
          <span style={{ "--i": i } as CSSProperties}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
