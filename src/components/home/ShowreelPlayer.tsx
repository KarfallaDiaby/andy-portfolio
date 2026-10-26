"use client";

import { useEffect, useRef } from "react";
import { Rec } from "@/components/brand/RedDot";

/** Lecteur plein écran, avec le son (dialog natif : Échap ferme, le focus reste dedans). */
export function ShowreelPlayer({
  open,
  onClose,
  src,
  poster,
  captions,
  lang,
  labels,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  poster: string;
  captions?: string;
  lang: string;
  labels: { title: string; close: string };
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const d = dialog.current;
    const v = video.current;
    if (!d || !v) return;
    if (open && !d.open) {
      d.showModal();
      v.currentTime = 0;
      v.play().catch(() => {});
    } else if (!open && d.open) {
      d.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialog}
      aria-label={labels.title}
      data-lenis-prevent
      onClose={() => {
        video.current?.pause();
        onClose();
      }}
      className="fixed inset-0 h-dvh w-screen grid-rows-[auto_1fr] bg-black text-white open:grid"
    >
      <div className="flex items-center justify-between px-gutter py-4 md:py-6">
        <span className="type-mono">
          <Rec />
        </span>
        <button type="button" onClick={() => dialog.current?.close()} className="type-label py-2">
          {labels.close}
        </button>
      </div>
      <div className="grid min-h-0 place-items-center px-gutter pb-gutter">
        <video
          ref={video}
          controls
          playsInline
          preload="none"
          poster={poster}
          className="aspect-video max-h-full w-full max-w-[calc((100dvh-7rem)*16/9)] bg-black"
        >
          <source src={src} type="video/mp4" />
          {captions && <track kind="captions" src={captions} srcLang={lang} label={lang.toUpperCase()} default />}
        </video>
      </div>
    </dialog>
  );
}
