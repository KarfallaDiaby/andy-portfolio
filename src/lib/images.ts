import "server-only";
import path from "node:path";
import sharp from "sharp";

export type ImageMeta = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
};

const memo = new Map<string, Promise<ImageMeta>>();

async function measure(src: string): Promise<ImageMeta> {
  const file = path.join(process.cwd(), "public", src);
  const { width = 1600, height = 900 } = await sharp(file).metadata();
  const tiny = await sharp(file).resize(16).webp({ quality: 50 }).toBuffer();
  return { src, width, height, blurDataURL: `data:image/webp;base64,${tiny.toString("base64")}` };
}

/** Dimensions et miniature floue d'une image de public/, calculées au build. */
export function getImage(src: string): Promise<ImageMeta> {
  let pending = memo.get(src);
  if (!pending) {
    pending = measure(src);
    memo.set(src, pending);
  }
  return pending;
}

export function getImages(srcs: string[]): Promise<ImageMeta[]> {
  return Promise.all(srcs.map(getImage));
}
