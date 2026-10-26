"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CinemaFrame, FramePlaceholder } from "@/components/brand/CinemaFrame";
import type { Category } from "@/content/types";
import { cn } from "@/lib/cn";
import { pad2 } from "@/lib/timecode";
import { useFinePointer } from "@/lib/use-media-query";
import { type ProjectCardData, ProjectCard } from "./ProjectCard";

export type WorkItem = ProjectCardData & {
  artist: string;
  year: string;
  category: Category;
  categoryLabel: string;
};

type Filter = "all" | Category;
const filters: Filter[] = ["all", "clip", "film", "brand", "documentary"];

type Labels = {
  view: string;
  list: string;
  grid: string;
  filter: string;
  projects: string;
  empty: string;
  noImage: string;
  cursor: string;
  categories: Record<Filter, string>;
};

/** Index des projets : vue liste (titres géants, aperçu qui suit le curseur) ou grille, avec filtres. */
export function WorkIndex({ items, labels }: { items: WorkItem[]; labels: Labels }) {
  const [view, setView] = useState<"list" | "grid">("list");
  const [filter, setFilter] = useState<Filter>("all");
  const [hovered, setHovered] = useState<string | null>(null);
  const fine = useFinePointer();

  const shown = filter === "all" ? items : items.filter((p) => p.category === filter);
  const count = (f: Filter) => (f === "all" ? items.length : items.filter((p) => p.category === f).length);

  return (
    <>
      <div className="flex flex-col gap-5 border-y border-white/25 py-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label={labels.filter} className="type-label flex flex-wrap gap-x-6 gap-y-3">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className="inline-flex items-start gap-1.5 opacity-50 transition-opacity hover:opacity-100 aria-pressed:opacity-100"
            >
              {labels.categories[f]}
              <span className="type-mono text-[0.625rem] tracking-normal">{pad2(count(f))}</span>
            </button>
          ))}
        </div>
        <div role="group" aria-label={labels.view} className="type-label flex gap-6">
          {(["list", "grid"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className="opacity-50 transition-opacity hover:opacity-100 aria-pressed:opacity-100"
            >
              {labels[v]}
            </button>
          ))}
        </div>
      </div>

      <p aria-live="polite" className="type-mono mt-6 text-white/45">
        {pad2(shown.length)} {labels.projects}
      </p>

      {shown.length === 0 ? (
        <p className="py-24 text-white/60">{labels.empty}</p>
      ) : view === "list" ? (
        <ul className="group/list mt-4 border-b border-white/25" onPointerLeave={() => setHovered(null)}>
          {shown.map((p, i) => (
            <li key={p.slug} className="border-t border-white/25 first:border-t-0">
              <Link
                href={p.href}
                data-cursor={labels.cursor}
                onPointerEnter={() => setHovered(p.slug)}
                className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-2 py-6 transition-opacity duration-500 group-hover/list:opacity-35 hover:!opacity-100 focus-visible:!opacity-100 md:grid-cols-12 md:gap-x-gutter md:py-8"
              >
                <span className="type-mono text-white/45 md:col-span-1">{pad2(i + 1)}</span>
                <span className="font-display text-[clamp(2.25rem,6.4vw,6.75rem)] leading-[0.95] font-light tracking-[-0.01em] italic md:col-span-7">
                  {p.title}
                </span>
                <span className="type-label col-start-2 text-white/75 md:col-span-2 md:col-start-auto">{p.artist}</span>
                <span className="type-mono col-start-2 text-white/55 md:col-span-2 md:col-start-auto md:text-right">
                  {p.year}&nbsp;&nbsp;{p.categoryLabel}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-8 grid gap-x-gutter gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((p) => (
            <li key={p.slug}>
              <ProjectCard
                project={p}
                sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                noImage={labels.noImage}
                cursor={labels.cursor}
              />
            </li>
          ))}
        </ul>
      )}

      {fine && view === "list" && <HoverPreview items={shown} hovered={hovered} noImage={labels.noImage} />}
    </>
  );
}

/** Fenêtre 2.39 qui suit le curseur et montre l'image du projet survolé. */
function HoverPreview({ items, hovered, noImage }: { items: WorkItem[]; hovered: string | null; noImage: string }) {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 180, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 26, mass: 0.6 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  const current = items.find((p) => p.slug === hovered);

  return (
    <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed top-0 left-0 z-40">
      <motion.div
        animate={{ opacity: current ? 1 : 0, scale: current ? 1 : 0.94 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-[clamp(280px,30vw,560px)] -translate-x-1/2 -translate-y-1/2"
      >
        <CinemaFrame>
          {items.map((p) =>
            p.image ? (
              <Image
                key={p.slug}
                src={p.image.src}
                alt=""
                fill
                sizes="30vw"
                className={cn(
                  "object-cover transition-opacity duration-300",
                  p.slug === hovered ? "opacity-100" : "opacity-0",
                )}
              />
            ) : null,
          )}
          {current && !current.image && <FramePlaceholder label={noImage} />}
        </CinemaFrame>
      </motion.div>
    </motion.div>
  );
}
