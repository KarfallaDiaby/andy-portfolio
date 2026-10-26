export const FPS = 24;

/** Timecode façon caméra, écrit comme dans la charte : 00.00.09.16 (heures, minutes, secondes, images). */
export function formatTimecode(seconds: number, fps = FPS): string {
  const frames = Math.max(0, Math.floor(seconds * fps));
  const parts = [
    Math.floor(frames / (fps * 3600)),
    Math.floor(frames / (fps * 60)) % 60,
    Math.floor(frames / fps) % 60,
    frames % fps,
  ];
  return parts.map((n) => String(n).padStart(2, "0")).join(".");
}

export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}
