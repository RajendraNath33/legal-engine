"use client";

import { useCallback, useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import RequireAuth from "@/components/RequireAuth";
import { useAuth } from "@/components/AuthProvider";
import { Library, FileText, Loader2 } from "lucide-react";

interface JudgmentRow {
  id: number;
  title: string;
  fileName: string;
  fileSize: number;
  createdAt: string;
}

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function LibraryPage() {
  const { user } = useAuth();
  const [judgments, setJudgments] = useState<JudgmentRow[]>([]);
  const [loading, setLoading] = useState(true);

  const loadJudgments = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const idToken = await user.getIdToken();
      const res = await fetch("/api/judgments", {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const data = await res.json();
      setJudgments(data.judgments || []);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadJudgments();
  }, [loadJudgments]);

  const handleView = async (id: number) => {
    if (!user) return;
    try {
      const idToken = await user.getIdToken();
      const res = await fetch(`/api/judgments/${id}`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch {
      /* noop */
    }
  };

  return (
    <RequireAuth>
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-x-hidden">
          <div className="relative px-4 py-6 sm:px-8 sm:py-10">
            <section className="mb-6 rounded-3xl border border-amber-500/20 bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-950 p-5 shadow-2xl shadow-amber-900/10 sm:p-8 light:from-white light:via-amber-50 light:to-white">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-300 sm:text-xs">
                <Library className="h-3.5 w-3.5" />
                Judgment Library
              </div>
              <h1 className="text-2xl font-semibold leading-tight tracking-tight text-slate-100 sm:text-3xl light:text-slate-900">
                Sabhi Judgments
              </h1>
              <p className="mt-3 text-base leading-relaxed text-slate-400 light:text-slate-600">
                Ye judgments admin ne upload ki hain, aap inhe dekh aur download kar sakte hain.
              </p>
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 light:border-slate-200 light:bg-white">
              {loading ? (
                <p className="flex items-center gap-2 text-sm text-slate-400">
                  <Loader2 className="h-4 w-4 animate-spin" /> Load ho raha hai...
                </p>
              ) : judgments.length === 0 ? (
                <p className="text-sm text-slate-400">Abhi tak koi judgment upload nahi hui.</p>
              ) : (
                <ul className="space-y-2">
                  {judgments.map((j) => (
                    <li key={j.id}>
                      <button
                        onClick={() => handleView(j.id)}
                        className="flex w-full items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/50 px-3 py-2.5 text-left text-sm text-slate-200 transition hover:border-amber-500/30 hover:text-amber-300 light:border-slate-200 light:bg-slate-50 light:text-slate-800"
                      >
                        <FileText className="h-4 w-4 shrink-0 text-amber-400" />
                        <span className="truncate">
                          {j.title}
                          <span className="ml-2 text-xs text-slate-500">{formatSize(j.fileSize)}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </main>
      </div>
    </RequireAuth>
  );
}
