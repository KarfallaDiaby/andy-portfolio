import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

// next/og ne lit pas le woff2 : versions .otf des mêmes polices d'essai. TODO(licence).
// Chemins écrits en entier : Turbopack n'embarque alors que ces fichiers.
const loadAssets = () =>
  Promise.all([
    readFile(join(process.cwd(), "src/fonts/og/GT-Sectra-Display-Light-Italic-Trial.otf")),
    readFile(join(process.cwd(), "src/fonts/og/GT-America-Mono-Regular-Trial.otf")),
    readFile(join(process.cwd(), "public/brand/logo/star-white.svg"), "utf8"),
  ]);

const corner = (pos: Record<string, number>, sides: Record<string, number>) => (
  <div
    style={{
      position: "absolute",
      width: 44,
      height: 44,
      borderColor: "#fff",
      borderStyle: "solid",
      borderWidth: 0,
      ...pos,
      ...sides,
    }}
  />
);

/** Image de partage : fond noir, repères de cadrage, point rouge, étoile, titre en Sectra Light Italic. */
export async function renderOg({ title, data }: { title: string; data: string[] }) {
  const [sectra, mono, starSvg] = await loadAssets();
  // Le SVG du logo est utilisé tel quel, sans ses métadonnées C2PA (inutiles au rendu).
  const star = starSvg.replace(/<metadata>[\s\S]*?<\/metadata>/, "");
  const starSrc = `data:image/svg+xml;base64,${Buffer.from(star).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          position: "relative",
          background: "#000",
          color: "#fff",
          padding: "80px 96px",
        }}
      >
        {corner({ top: 36, left: 44 }, { borderTopWidth: 2, borderLeftWidth: 2 })}
        {corner({ top: 36, right: 44 }, { borderTopWidth: 2, borderRightWidth: 2 })}
        {corner({ bottom: 36, left: 44 }, { borderBottomWidth: 2, borderLeftWidth: 2 })}
        {corner({ bottom: 36, right: 44 }, { borderBottomWidth: 2, borderRightWidth: 2 })}
        <div
          style={{
            position: "absolute",
            top: 44,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
            fontFamily: "Mono",
            fontSize: 16,
            letterSpacing: 1.4,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 6, background: "#F50311" }} />
          REC
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og n'accepte que <img> */}
        <img src={starSrc} width={300} height={217} alt="" style={{ position: "absolute", top: 150, right: 110 }} />
        <div style={{ fontFamily: "Sectra", fontStyle: "italic", fontSize: 104, lineHeight: 1, maxWidth: 820 }}>
          {title}
        </div>
        <div
          style={{
            display: "flex",
            gap: 36,
            marginTop: 32,
            fontFamily: "Mono",
            fontSize: 18,
            letterSpacing: 1.4,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.62)",
          }}
        >
          {data.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Sectra", data: sectra, style: "italic", weight: 300 },
        { name: "Mono", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}
