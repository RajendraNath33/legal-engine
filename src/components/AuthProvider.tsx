"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signOut as firebaseSignOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(
      auth,
      (nextUser) => {
        setUser(nextUser);
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const signOut = async () => {
    if (!auth) {
      return;
    }

    await firebaseSignOut(auth);
    router.replace("/login");
  };

  const isAdmin = useMemo(() => {
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    return Boolean(user?.email && adminEmail && user.email.toLowerCase() === adminEmail.toLowerCase());
  }, [user]);

  const value = useMemo(
    () => ({ user, loading, isAdmin, signOut }),
    [user, loading, isAdmin, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}