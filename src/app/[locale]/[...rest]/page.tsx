import { notFound } from "next/navigation";

// Toute adresse inconnue affiche la 404 du site, dans sa langue.
export default function CatchAll() {
  notFound();
}
