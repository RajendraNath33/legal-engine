import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const STORAGE_DIR = path.join(process.cwd(), "storage", "judgments");

export async function ensureStorageDir() {
  await fs.mkdir(STORAGE_DIR, { recursive: true });
}

export async function saveJudgmentFile(originalName: string, buffer: Buffer) {
  await ensureStorageDir();
  const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, "_");
  const uniqueName = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}-${safeName}`;
  const fullPath = path.join(STORAGE_DIR, uniqueName);
  await fs.writeFile(fullPath, buffer);
  return { storagePath: uniqueName, fullPath };
}

export function getJudgmentFilePath(storagePath: string) {
  return path.join(STORAGE_DIR, storagePath);
}

export async function deleteJudgmentFile(storagePath: string) {
  const fullPath = getJudgmentFilePath(storagePath);
  await fs.unlink(fullPath).catch(() => {});
}
