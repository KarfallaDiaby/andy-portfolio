import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Un package-lock.json traîne dans C:\Users\HP : on fixe la racine du projet.
  turbopack: {
    root: __dirname,
  },
  // En développement, autorise le téléphone sur le même Wi-Fi (http://192.168.x.x:3000).
  // Sans ça, Next bloque ses scripts de dev : la page s'affiche mais rien n'est cliquable.
  allowedDevOrigins: ["192.168.*.*"],
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    // Vignettes YouTube des projets sans image de couverture.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
};

export default nextConfig;
