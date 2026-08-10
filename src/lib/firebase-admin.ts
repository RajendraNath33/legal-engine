import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

export const adminAuth = admin.auth();

export async function verifyIdToken(idToken: string) {
  return adminAuth.verifyIdToken(idToken);
}
