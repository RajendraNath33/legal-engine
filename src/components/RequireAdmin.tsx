"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { loading, isAdmin } = useAuth();

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.replace("/dashboard");
    }
  }, [loading, isAdmin, router]);

  if (loading) {
    return null;
  }

  if (!isAdmin) {
    return null;
  }

  return <>{children}</>;
}