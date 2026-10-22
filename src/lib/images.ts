"use client";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES, base64ToBytes, bytesToBase64, verifyRoundTrip } from "./image-codec";

export type PreparedImage = { mime: string; name: string; size: number; full: string; thumb: string };

/** Reads a file into a lossless base64 original plus a small WebP preview (used for cards and lists). */
export async function prepareImage(file: File): Promise<PreparedImage> {
  if (!(ALLOWED_IMAGE_TYPES as readonly string[]).includes(file.type)) throw new Error("Use a JPG, PNG, WebP, GIF or AVIF image.");
  if (file.size > MAX_IMAGE_BYTES) throw new Error(`This image is ${(file.size / 1048576).toFixed(1)} MB. The limit is 7.5 MB: export a smaller copy and try again.`);
  const bytes = new Uint8Array(await file.arrayBuffer());
  const full = bytesToBase64(bytes);
  if (!verifyRoundTrip(bytes, full)) throw new Error("The image could not be stored without loss. Nothing was saved.");
  return { mime: file.type, name: file.name.slice(0, 120), size: file.size, full, thumb: await makeThumb(file) };
}

async function makeThumb(file: File, max = 1100): Promise<string> {
  const bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
  const k = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const c = document.createElement("canvas");
  c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
  c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
  bmp.close();
  const blob: Blob = await new Promise((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error("Could not create a preview."))), "image/webp", 0.9));
  return bytesToBase64(new Uint8Array(await blob.arrayBuffer()));
}

/** Turns stored base64 back into a normal viewable image URL (a Blob), without a giant data: URL in the page. */
export function base64ToObjectUrl(b64: string, mime: string): string {
  return URL.createObjectURL(new Blob([base64ToBytes(b64) as BlobPart], { type: mime }));
}

export const imageSrc = (id?: string | null, size: "thumb" | "full" = "thumb") => (id ? `/api/img/${id}${size === "full" ? "?size=full" : ""}` : "");
