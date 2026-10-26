import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";

// Remplaçants gratuits, mêmes variables que fonts-trial.ts.

export const display = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--ff-display",
});

export const fine = Fraunces({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--ff-fine",
  preload: false,
});

export const sans = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--ff-sans",
});

export const ext = Inter_Tight({
  subsets: ["latin"],
  weight: "500",
  variable: "--ff-ext",
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--ff-mono",
});
