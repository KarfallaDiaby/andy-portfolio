import { Fragment } from "react";
import { cn } from "@/lib/cn";

/** La ligne de données en mono : champs séparés par des espaces, comme dans la charte. */
export function DataLine({
  items,
  className,
}: {
  items: (string | false | null | undefined)[];
  className?: string;
}) {
  const parts = items.filter((p): p is string => Boolean(p));
  return (
    <p className={cn("type-mono flex flex-wrap gap-x-[2.5ch] gap-y-1", className)}>
      {parts.map((part, i) => (
        <Fragment key={i}>
          <span>{part}</span>
          {i < parts.length - 1 && <span className="sr-only">, </span>}
        </Fragment>
      ))}
    </p>
  );
}
