import { cn } from "@/lib/cn";

/** Le point rouge : seule couleur de la marque, comme le voyant d'une caméra qui enregistre. */
export function RedDot({ blink = false, className }: { blink?: boolean; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block size-2 shrink-0 rounded-full bg-signal", blink && "animate-rec", className)}
    />
  );
}

export function Rec({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <RedDot blink />
      Rec
    </span>
  );
}
