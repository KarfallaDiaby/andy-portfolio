"use client";

import Image from "next/image";
import { useState } from "react";
import { CinemaFrame, FramePlaceholder } from "@/components/brand/CinemaFrame";
import { PlayIcon } from "@/components/brand/PlayIcon";
import type { ImageMeta } from "@/lib/images";
import { cn } from "@/lib/cn";
import { embedUrl, parseVideoUrl, youtubeThumbnail } from "@/lib/video";

/**
 * Lecteur « lite » : seulement une vignette tant qu'on ne clique pas.
 * YouTube et Vimeo passent en 16:9 à la lecture (leur lecteur n'existe pas en 2.39) ;
 * un fichier local reste dans la fenêtre 2.39.
 */
export function LiteVideo({
  url,
  poster,
  title,
  labels,
}: {
  url?: string;
  poster: ImageMeta | null;
  title: string;
  labels: { play: string; noVideo: string; cursor: string };
}) {
  const [playing, setPlaying] = useState(false);
  const source = parseVideoUrl(url);
  const thumb = poster?.src ?? (source?.kind === "youtube" ? youtubeThumbnail(source.id) : null);
  const embed = source ? embedUrl(source) : null;

  return (
    <CinemaFrame
      marks={!playing}
      className={cn("transition-[aspect-ratio] duration-700 ease-film", playing && embed && "aspect-video")}
    >
      {playing && source ? (
        embed ? (
          <iframe
            src={embed}
            title={title}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <video
            src={source.kind === "file" ? source.src : undefined}
            controls
            autoPlay
            playsInline
            className="absolute inset-0 size-full object-cover"
          />
        )
      ) : (
        <>
          {thumb ? (
            <Image
              src={thumb}
              alt=""
              fill
              sizes="100vw"
              preload
              placeholder={poster ? "blur" : "empty"}
              blurDataURL={poster?.blurDataURL}
              className="object-cover"
            />
          ) : (
            <FramePlaceholder label={labels.noVideo} />
          )}
          {source && (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              data-cursor={labels.cursor}
              className="group absolute inset-0 z-20 grid place-items-center"
            >
              <span className="type-label inline-flex items-center gap-3 border border-white/40 bg-black/45 px-5 py-3.5 text-white backdrop-blur-sm transition-colors group-hover:border-white">
                <PlayIcon />
                {labels.play}
              </span>
            </button>
          )}
          {!source && thumb && <FramePlaceholder label={labels.noVideo} overImage />}
        </>
      )}
    </CinemaFrame>
  );
}
