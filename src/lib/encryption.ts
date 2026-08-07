import { createCipheriv, createHash, randomBytes } from "crypto";

const encryptionKey = process.env.AUTH_TOKEN_ENCRYPTION_KEY;

if (!encryptionKey) {
  throw new Error("AUTH_TOKEN_ENCRYPTION_KEY is required");
}

const encryptionKeyBuffer = createHash("sha256").update(encryptionKey).digest();

export function encryptValue(value: string | null | undefined) {
  if (!value) return null;

  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKeyBuffer, iv);
  const ciphertext = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return `${iv.toString("hex")}:${tag.toString("hex")}:${ciphertext.toString("hex")}`;
}
