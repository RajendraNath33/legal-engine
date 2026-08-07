import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, PhoneAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAo0seFFBUlpXkb8EhjCkqouBRjlJsWgBI",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "smart-legal-ai-learning.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "smart-legal-ai-learning",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "smart-legal-ai-learning.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "972611762531",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:972611762531:web:179d855acc88da47f97b56",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-TED7PSB2VC",
};

const app = typeof window !== "undefined" ? (getApps().length ? getApp() : initializeApp(firebaseConfig)) : undefined;

export const auth = app ? getAuth(app) : undefined as any;
export const googleProvider = typeof window !== "undefined" ? new GoogleAuthProvider() : undefined as any;
if (googleProvider) {
  googleProvider.addScope("https://www.googleapis.com/auth/drive.file");
  googleProvider.setCustomParameters({
    access_type: "offline",
    prompt: "consent",
  });
}

export const phoneProvider = auth ? new PhoneAuthProvider(auth) : undefined as any;
export { firebaseConfig };
