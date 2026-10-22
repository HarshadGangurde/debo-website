/**
 * Lossless image <-> text. The original file bytes are base64-encoded exactly as they are (no re-compression),
 * stored as a string, and decoded back to identical bytes. `verifyRoundTrip` proves this before anything is saved.
 * Isomorphic: uses only btoa/atob and typed arrays.
 */
const CHUNK = 0x8000;

export function bytesToBase64(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i += CHUNK) bin += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  return btoa(bin);
}

export function base64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

/** True only if decoding `b64` reproduces `original` byte for byte. */
export function verifyRoundTrip(original: Uint8Array, b64: string): boolean {
  const back = base64ToBytes(b64);
  if (back.length !== original.length) return false;
  for (let i = 0; i < original.length; i++) if (back[i] !== original[i]) return false;
  return true;
}

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"] as const;
export const MAX_IMAGE_BYTES = 7.5 * 1024 * 1024; // base64 adds ~33%, keeping a write under Realtime Database's 16 MB limit
