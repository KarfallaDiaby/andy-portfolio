import Image from "next/image";

// Dimensions d'origine des SVG de public/brand/logo/ (viewBox). Jamais retapés, jamais déformés.
const logos = {
  star: { width: 842, height: 609 },
  wordmark: { width: 897, height: 401 },
  horizontal: { width: 1470, height: 429 },
  vertical: { width: 921, height: 1078 },
  signature: { width: 1317, height: 1127 },
};

export type LogoVariant = keyof typeof logos;

/** Logo blanc sur fond sombre, noir sur fond clair. Jamais recoloré. */
export function Logo({
  variant,
  tone = "white",
  alt,
  className,
  preload = false,
}: {
  variant: LogoVariant;
  tone?: "white" | "black";
  alt: string;
  className?: string;
  preload?: boolean;
}) {
  // Le lockup vertical n'existe qu'en blanc dans public/brand/logo/.
  const file = variant === "vertical" ? "vertical-white" : `${variant}-${tone}`;
  return (
    <Image
      src={`/brand/logo/${file}.svg`}
      width={logos[variant].width}
      height={logos[variant].height}
      alt={alt}
      className={className}
      preload={preload}
      unoptimized
    />
  );
}
