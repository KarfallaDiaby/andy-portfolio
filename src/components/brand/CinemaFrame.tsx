import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { CropMarks } from "./CropMarks";

export type HudSlots = {
  tl?: ReactNode;
  tc?: ReactNode;
  tr?: ReactNode;
  bl?: ReactNode;
  br?: ReactNode;
};

/**
 * La fenêtre 2.39 : le film dans un cadre cinémascope, du noir tout autour.
 * Le média enfant doit être `absolute inset-0 size-full object-cover`.
 */
export function CinemaFrame({
  children,
  className,
  marks = true,
  hud,
}: {
  children: ReactNode;
  className?: string;
  marks?: boolean;
  hud?: HudSlots;
}) {
  return (
    <div className={cn("@container relative aspect-scope overflow-hidden bg-black text-white", className)}>
      {children}
      {marks && <CropMarks />}
      {hud && <Hud {...hud} />}
    </div>
  );
}

/** Données techniques en mono, calées entre les repères de cadrage. Masquées sur les petites fenêtres. */
function Hud({ tl, tc, tr, bl, br }: HudSlots) {
  const row = "absolute inset-x-[calc(max(10px,2.6cqw)+1.4cqw)] grid grid-cols-3 gap-4";
  return (
    <div className="type-mono pointer-events-none absolute inset-[3cqw] z-10 hidden text-white/80 @min-[560px]:block">
      <div className={cn(row, "top-0 translate-y-[-0.2em] items-start")}>
        <div className="justify-self-start">{tl}</div>
        <div className="justify-self-center">{tc}</div>
        <div className="justify-self-end text-right">{tr}</div>
      </div>
      <div className={cn(row, "bottom-0 translate-y-[0.2em] items-end")}>
        <div className="justify-self-start">{bl}</div>
        <div />
        <div className="justify-self-end text-right">{br}</div>
      </div>
    </div>
  );
}

/** Texte d'attente au centre du cadre. `overImage` assombrit l'image pour qu'il reste lisible. */
export function FramePlaceholder({ label, overImage = false }: { label: string; overImage?: boolean }) {
  return (
    <div
      className={cn(
        "type-mono absolute inset-0 grid place-items-center",
        overImage ? "bg-black/60 text-white/80" : "text-white/45",
      )}
    >
      <span>{label}</span>
    </div>
  );
}
