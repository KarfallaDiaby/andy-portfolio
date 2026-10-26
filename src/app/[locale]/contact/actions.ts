"use server";

import { site } from "@/content/site";
import { isFilled } from "@/lib/placeholder";

export type BriefState = { status: "idle" | "sent" | "missing" | "unavailable" | "failed" };

/**
 * Envoi du brief par e-mail, côté serveur. Utilisée quand site.contact.formMode vaut "server".
 *
 * TODO(resend) : brancher Resend.
 *   1. npm install resend
 *   2. Créer une clé sur resend.com, vérifier le domaine d'envoi, puis ajouter
 *      RESEND_API_KEY dans .env.local et dans les variables d'environnement Vercel.
 *   3. Décommenter le bloc ci-dessous et passer formMode à "server" dans src/content/site.ts.
 */
export async function sendBrief(_previous: BriefState, formData: FormData): Promise<BriefState> {
  const field = (name: string) => String(formData.get(name) ?? "").trim();
  const brief = {
    name: field("name"),
    email: field("email"),
    artist: field("artist"),
    type: field("type"),
    budget: field("budget"),
    date: field("date"),
    message: field("message"),
  };
  if (!brief.name || !brief.email || !brief.message) return { status: "missing" };
  if (!process.env.RESEND_API_KEY || !isFilled(site.contact.email)) return { status: "unavailable" };

  // const { Resend } = await import("resend");
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // const { error } = await resend.emails.send({
  //   from: "Site Andy <brief@directedbyandy.com>",
  //   to: site.contact.email,
  //   replyTo: brief.email,
  //   subject: `Brief : ${brief.artist || brief.name}`,
  //   text: Object.entries(brief).map(([k, v]) => `${k} : ${v}`).join("\n"),
  // });
  // return { status: error ? "failed" : "sent" };

  return { status: "unavailable" };
}
