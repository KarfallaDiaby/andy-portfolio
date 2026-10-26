export type VideoSource =
  | { kind: "youtube"; id: string }
  | { kind: "vimeo"; id: string }
  | { kind: "file"; src: string };

/** Reconnaît un lien YouTube, Vimeo ou un fichier local de public/. */
export function parseVideoUrl(url?: string): VideoSource | null {
  if (!url) return null;
  if (url.startsWith("/")) return { kind: "file", src: url };
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^(www|m)\./, "");
    if (host === "youtu.be") return { kind: "youtube", id: u.pathname.slice(1) };
    if (host === "youtube.com" || host === "youtube-nocookie.com") {
      const v = u.searchParams.get("v");
      if (v) return { kind: "youtube", id: v };
      const m = u.pathname.match(/\/(embed|shorts|live)\/([^/?]+)/);
      if (m) return { kind: "youtube", id: m[2] };
    }
    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const m = u.pathname.match(/(\d{6,})/);
      if (m) return { kind: "vimeo", id: m[1] };
    }
  } catch {
    return null;
  }
  return null;
}

export function embedUrl(video: VideoSource): string | null {
  if (video.kind === "youtube") {
    return `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&playsinline=1`;
  }
  if (video.kind === "vimeo") {
    return `https://player.vimeo.com/video/${video.id}?autoplay=1&dnt=1&title=0&byline=0&portrait=0`;
  }
  return null;
}

/** Vignette YouTube : hqdefault existe toujours (maxresdefault non). */
export function youtubeThumbnail(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
