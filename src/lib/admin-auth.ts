import { NextRequest } from "next/server";
import { verifyIdToken } from "@/lib/firebase-admin";

export async function requireAdminFromRequest(request: NextRequest) {
  const authHeader = request.headers.get("authorization") || "";
  const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!idToken) {
    return { ok: false as const, status: 401, error: "Missing auth token" };
  }

  const verifiedToken = await verifyIdToken(idToken);
  const adminEmail = process.env.ADMIN_EMAIL;
  const userEmail = verifiedToken.email;

  if (!adminEmail || !userEmail || userEmail.toLowerCase() !== adminEmail.toLowerCase()) {
    return { ok: false as const, status: 403, error: "Admin access required" };
  }

  return { ok: true as const, email: userEmail };
}

export async function requireUserFromRequest(request: NextRequest) {
  const authHeader = request.headers.get("authorization") || "";
  const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!idToken) {
    return { ok: false as const, status: 401, error: "Missing auth token" };
  }

  const verifiedToken = await verifyIdToken(idToken);
  return { ok: true as const, email: verifiedToken.email, uid: verifiedToken.uid };
}
