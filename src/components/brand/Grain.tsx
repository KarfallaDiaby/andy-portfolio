"use client";

import { usePathname } from "next/navigation";
import { isLightPath } from "@/lib/tone";

/** Grain de film sur tout le site. */
export function Grain() {
  const pathname = usePathname();
  return <div aria-hidden className="grain" data-tone={isLightPath(pathname) ? "light" : "dark"} />;
}
