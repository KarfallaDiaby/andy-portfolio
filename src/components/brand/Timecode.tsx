"use client";

import { type RefObject, useEffect, useRef } from "react";
import { formatTimecode } from "@/lib/timecode";

/** Timecode qui défile : calé sur la vidéo si elle est fournie, sinon depuis l'affichage. */
export function Timecode({ videoRef }: { videoRef?: RefObject<HTMLVideoElement | null> }) {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;
    const tick = () => {
      const seconds = videoRef?.current ? videoRef.current.currentTime : (performance.now() - start) / 1000;
      if (el.current) el.current.textContent = `TC ${formatTimecode(seconds)}`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [videoRef]);

  return (
    <span ref={el} aria-hidden className="tabular-nums">
      TC 00.00.00.00
    </span>
  );
}
