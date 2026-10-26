"use client";

import { useEffect, useRef, useState } from "react";
import { CinemaFrame } from "@/components/brand/CinemaFrame";
import { PlayIcon } from "@/components/brand/PlayIcon";
import { Rec } from "@/components/brand/RedDot";
import { Timecode } from "@/components/brand/Timecode";
import { Reveal } from "@/components/motion/Reveal";
import { useReducedMotion } from "@/lib/use-media-query";
import { ShowreelPlayer } from "./ShowreelPlayer";

type Labels = {
  showreel: string;
  watch: string;
  close: string;
  muted: string;
  role: string;
  play: string;
};

/** Accueil : le showreel muet en boucle dans la fenêtre 2.39, avec son HUD. */
export function ShowreelHero({
  name,
  src,
  poster,
  loopStart,
  year,
  captions,
  lang,
  labels,
}: {
  name: string;
  src: string;
  poster: string;
  loopStart: number;
  year: string;
  captions?: string;
  lang: string;
  labels: Labels;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);

  // Lecture seulement quand le cadre est visible, et jamais si l'utilisateur limite les animations.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (reduced) {
      v.pause();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (v.currentTime < loopStart) v.currentTime = loopStart;
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduced, loopStart]);

  const restart = () => {
    const v = video.current;
    if (!v) return;
    v.currentTime = loopStart;
    v.play().catch(() => {});
  };

  return (
    <section
      aria-label={labels.showreel}
      className="flex min-h-svh flex-col justify-center gap-6 px-gutter pt-24 pb-10 md:gap-8 md:pt-28"
    >
      <CinemaFrame
        hud={{
          tl: <Rec />,
          tc: (
            <span>
              {labels.showreel} {year}
            </span>
          ),
          tr: <span>24 FPS&nbsp;&nbsp;2.39</span>,
          bl: <span>{name}</span>,
          br: <Timecode videoRef={video} />,
        }}
      >
        <video
          ref={video}
          muted
          playsInline
          preload="metadata"
          poster={poster}
          onEnded={restart}
          aria-label={labels.muted}
          className="absolute inset-0 size-full object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>
        <button
          type="button"
          tabIndex={-1}
          aria-hidden
          data-cursor={labels.play}
          onClick={() => setOpen(true)}
          className="absolute inset-0 z-20"
        />
      </CinemaFrame>

      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="type-label text-white/60">{labels.role}</p>
          <Reveal as="h1" lines={[name]} className="type-title mt-3" />
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          data-cursor={labels.play}
          className="type-label inline-flex items-center gap-3 self-start border border-white/30 px-5 py-3.5 transition-colors hover:border-white md:self-auto"
        >
          <PlayIcon />
          {labels.watch}
        </button>
      </div>

      <ShowreelPlayer
        open={open}
        onClose={() => setOpen(false)}
        src={src}
        poster={poster}
        captions={captions}
        lang={lang}
        labels={{ title: labels.showreel, close: labels.close }}
      />
    </section>
  );
}
