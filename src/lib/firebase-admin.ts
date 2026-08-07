import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp();
}

export const adminAuth = admin.auth();

export async function verifyIdToken(idToken: string) {
  return adminAuth.verifyIdToken(idToken);
}
