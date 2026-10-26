import type { Social } from "@/content/site";
import { cn } from "@/lib/cn";

/** Réseaux : un compte sans adresse reste affiché mais n'est pas cliquable. */
export function SocialLinks({ socials, className }: { socials: Social[]; className?: string }) {
  return (
    <ul className={cn("space-y-3", className)}>
      {socials.map((s) => (
        <li key={s.label} className="flex items-baseline justify-between gap-6">
          <span className="type-label">
            {s.url ? (
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="opacity-65 transition-opacity hover:opacity-100">
                {s.label}
              </a>
            ) : (
              <span className="opacity-65">{s.label}</span>
            )}
          </span>
          <span className="type-mono opacity-45">{s.handle}</span>
        </li>
      ))}
    </ul>
  );
}
