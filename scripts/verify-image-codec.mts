// Proves the base64 codec is lossless on real photos: node --experimental-strip-types scripts/verify-image-codec.mts <files...>
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { base64ToBytes, bytesToBase64, verifyRoundTrip } from "../src/lib/image-codec.ts";
let ok = true;
for (const f of process.argv.slice(2)) {
  const bytes = new Uint8Array(readFileSync(f));
  const b64 = bytesToBase64(bytes);
  const back = base64ToBytes(b64);
  const same = createHash("sha256").update(bytes).digest("hex") === createHash("sha256").update(back).digest("hex");
  console.log(`${same && verifyRoundTrip(bytes, b64) ? "LOSSLESS" : "MISMATCH"}  ${(bytes.length / 1048576).toFixed(2)} MB -> ${(b64.length / 1048576).toFixed(2)} MB text  ${f.split("/").pop()}`);
  ok &&= same;
}
process.exit(ok ? 0 : 1);
