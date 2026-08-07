"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signOut as firebaseSignOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      console.error("AuthProvider missing auth instance");
      setLoading(false);
      return;
    }

    console.error("AuthProvider starting auth listener");
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      console.error("AuthProvider onAuthStateChanged", { nextUser });
      setUser(nextUser);
      setLoading(false);
    });

    return () => {
      console.log("AuthProvider unsubscribing auth listener");
      unsubscribe();
    };
  }, []);

  const signOut = async () => {
    if (!auth) {
      console.error("AuthProvider signOut called without auth");
      return;
    }

    console.error("AuthProvider signOut called");
    await firebaseSignOut(auth);
    router.replace("/login");
  };

  const value = useMemo(() => ({ user, loading, signOut }), [user, loading, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
