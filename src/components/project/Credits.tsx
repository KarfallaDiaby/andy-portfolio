import { type Project, creditRoles } from "@/content/types";
import type { Dictionary } from "@/i18n/fr";

export function Credits({ credits, labels }: { credits: Project["credits"]; labels: Dictionary["credits"] }) {
  return (
    <dl className="border-t border-white/25">
      {creditRoles
        .filter((role) => credits[role])
        .map((role) => (
          <div key={role} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-6 border-b border-white/12 py-3.5">
            <dt className="type-mono pt-0.5 text-white/50">{labels[role]}</dt>
            <dd>{credits[role]}</dd>
          </div>
        ))}
    </dl>
  );
}
