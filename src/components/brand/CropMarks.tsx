import { cn } from "@/lib/cn";

const corners = [
  "top-0 left-0 border-t border-l @min-[960px]:border-t-2 @min-[960px]:border-l-2",
  "top-0 right-0 border-t border-r @min-[960px]:border-t-2 @min-[960px]:border-r-2",
  "bottom-0 left-0 border-b border-l @min-[960px]:border-b-2 @min-[960px]:border-l-2",
  "bottom-0 right-0 border-b border-r @min-[960px]:border-b-2 @min-[960px]:border-r-2",
];

/** Repères de cadrage en équerre. À placer dans un parent `@container` et `relative`. */
export function CropMarks({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("pointer-events-none absolute inset-[3cqw] z-10", className)}>
      {corners.map((c) => (
        <span key={c} className={cn("absolute size-[max(10px,2.6cqw)] border-current", c)} />
      ))}
    </span>
  );
}
