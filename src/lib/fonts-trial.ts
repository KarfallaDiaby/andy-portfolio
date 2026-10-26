import localFont from "next/font/local";

// Versions d'essai Grilli Type (05_Livrable/…/03_Typographies).
// Il leur manque ’ « » — · : les polices de secours (Times New Roman, Arial) dessinent ces signes.

export const display = localFont({
  src: [
    { path: "../fonts/GT-Sectra-Display-Light-Trial.woff2", weight: "300", style: "normal" },
    { path: "../fonts/GT-Sectra-Display-Light-Italic-Trial.woff2", weight: "300", style: "italic" },
    { path: "../fonts/GT-Sectra-Display-Regular-Trial.woff2", weight: "400", style: "normal" },
  ],
  variable: "--ff-display",
  fallback: ["Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

export const fine = localFont({
  src: [{ path: "../fonts/GT-Sectra-Fine-Book-Italic-Trial.woff2", weight: "400", style: "italic" }],
  variable: "--ff-fine",
  fallback: ["Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
  preload: false,
});

export const sans = localFont({
  src: [
    { path: "../fonts/GT-America-Standard-Light-Trial.woff2", weight: "300", style: "normal" },
    { path: "../fonts/GT-America-Standard-Regular-Trial.woff2", weight: "400", style: "normal" },
    { path: "../fonts/GT-America-Standard-Medium-Trial.woff2", weight: "500", style: "normal" },
  ],
  variable: "--ff-sans",
  fallback: ["Arial", "sans-serif"],
});

export const ext = localFont({
  src: [{ path: "../fonts/GT-America-Extended-Medium-Trial.woff2", weight: "500", style: "normal" }],
  variable: "--ff-ext",
  fallback: ["Arial", "sans-serif"],
});

export const mono = localFont({
  src: [{ path: "../fonts/GT-America-Mono-Regular-Trial.woff2", weight: "400", style: "normal" }],
  variable: "--ff-mono",
  fallback: ["ui-monospace", "Consolas", "monospace"],
  adjustFontFallback: false,
});
