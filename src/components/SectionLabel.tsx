import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Libellé de section, posé sur un filet comme les pages du brand book. */
export function SectionLabel({
  children,
  aside,
  as: Tag = "h2",
  id,
  className,
}: {
  children: ReactNode;
  aside?: ReactNode;
  as?: "h2" | "p";
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-baseline justify-between gap-6 border-t border-current/25 pt-5", className)}>
      <Tag id={id} className="type-label opacity-60">
        {children}
      </Tag>
      {aside}
    </div>
  );
}
