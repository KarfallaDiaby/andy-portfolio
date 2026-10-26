"use client";

import { type FormEvent, type ReactNode, useActionState, useId, useState } from "react";
import { type BriefState, sendBrief } from "@/app/[locale]/contact/actions";
import type { Dictionary } from "@/i18n/fr";

type Labels = Dictionary["contact"]["form"] & { types: string[] };

const input =
  "w-full border-b border-white/30 bg-transparent py-3 text-lg text-white outline-none transition-colors placeholder:text-white/30 focus:border-white";

function Field({ label, children, id }: { label: string; children: ReactNode; id: string }) {
  return (
    <div>
      <label htmlFor={id} className="type-label block text-white/60">
        {label}
      </label>
      {children}
    </div>
  );
}

/**
 * Formulaire de brief. Mode "mailto" : ouvre la messagerie avec le brief rempli.
 * Mode "server" : envoi par la Server Action (voir TODO(resend) dans actions.ts).
 */
export function BriefForm({ email, mode, labels }: { email: string; mode: "mailto" | "server"; labels: Labels }) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const [opened, setOpened] = useState(false);
  const [state, action, pending] = useActionState<BriefState, FormData>(sendBrief, { status: "idle" });

  function openMail(e: FormEvent<HTMLFormElement>) {
    if (mode !== "mailto") return;
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (name: string) => String(data.get(name) ?? "").trim();
    const body = [
      [labels.name, get("name")],
      [labels.artist, get("artist")],
      [labels.type, get("type")],
      [labels.budget, get("budget")],
      [labels.date, get("date")],
    ]
      .filter(([, value]) => value)
      .map(([label, value]) => `${label} : ${value}`)
      .concat(["", get("message")])
      .join("\n");
    const subject = `${labels.subject} : ${get("artist") || get("name")}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  const status =
    mode === "mailto"
      ? opened && labels.sent
      : state.status === "sent"
        ? labels.sent
        : state.status === "missing"
          ? labels.missing
          : state.status === "unavailable" || state.status === "failed"
            ? labels.unavailable
            : "";

  return (
    <form action={mode === "server" ? action : undefined} onSubmit={openMail} className="grid gap-9">
      <div className="grid gap-9 sm:grid-cols-2 sm:gap-x-gutter">
        <Field label={labels.name} id={id("name")}>
          <input id={id("name")} name="name" required autoComplete="name" className={input} />
        </Field>
        <Field label={labels.artist} id={id("artist")}>
          <input id={id("artist")} name="artist" autoComplete="organization" className={input} />
        </Field>
        {mode === "server" && (
          <Field label={labels.email} id={id("email")}>
            <input id={id("email")} name="email" type="email" required autoComplete="email" className={input} />
          </Field>
        )}
        <Field label={labels.type} id={id("type")}>
          <select id={id("type")} name="type" defaultValue="" className={`${input} appearance-none bg-black`}>
            <option value="" disabled>
              {labels.choose}
            </option>
            {labels.types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label={labels.budget} id={id("budget")}>
          <input id={id("budget")} name="budget" className={input} />
        </Field>
        <Field label={labels.date} id={id("date")}>
          <input id={id("date")} name="date" type="date" className={input} />
        </Field>
      </div>
      <Field label={labels.message} id={id("message")}>
        <textarea id={id("message")} name="message" required rows={5} className={`${input} resize-y`} />
      </Field>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className="type-label inline-flex shrink-0 items-center gap-4 self-start border border-white/30 px-6 py-4 whitespace-nowrap transition-colors hover:border-white disabled:opacity-50"
        >
          {labels.submit}
        </button>
        <p className="type-mono text-white/45">{mode === "mailto" ? labels.note : ""}</p>
      </div>
      <p role="status" aria-live="polite" className="text-white/80">
        {status}
      </p>
    </form>
  );
}
