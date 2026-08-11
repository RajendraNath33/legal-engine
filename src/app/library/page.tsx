"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/components/AuthProvider";
import { Library, FileText, Search } from "lucide-react";
import { DOCUMENT_CATEGORIES, categoryLabel } from "@/lib/document-categories";

interface JudgmentRow {
  id: number;
  title: string;
  category: string;
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [error, setError] = useState<string | null>(null);

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
    } catch {
      setError("Judgments load nahi ho sakin.");
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
      if (!res.ok) throw new Error("PDF load nahi ho payi.");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch {
      setError("Judgment khulne mein error aayi.");
    }
  };

  const filteredAndSearched = useMemo(() => {
    let results = judgments;
    if (filter !== "all") {
      results = results.filter((j) => j.category === filter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter((j) => j.title.toLowerCase().includes(q));
    }
    return results;
  }, [judgments, filter, searchQuery]);

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-x-hidden">
        <div className="relative px-4 py-6 sm:px-8 sm:py-10">
          <section className="mb-6 rounded-3xl border border-amber-500/20 bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-950 p-5 shadow-2xl shadow-amber-900/10 sm:p-8 light:from-white light:via-amber-50 light:to-white">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-300 sm:text-xs">
              <Library className="h-3.5 w-3.5" />
              Dastaweez Library
            </div>
            <h1 className="text-2xl font-semibold leading-tight tracking-tight text-slate-100 sm:text-3xl light:text-slate-900">
              Kanooni Documents
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate-400 light:text-slate-600">
              Yahan se aap sabhi uploaded Judgments, Bare Acts, Law Books or Notes dekh sakte hain aur unhein read kar sakte hain.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 light:border-slate-200 light:bg-white">
            <div className="mb-6 relative max-w-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-slate-500" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Document title search karein..."
                className="w-full rounded-lg border border-slate-700 bg-slate-950 pl-10 pr-3 py-2 text-sm text-slate-100 outline-none focus:border-amber-500/50 light:border-slate-300 light:bg-slate-50 light:text-slate-900"
              />
            </div>

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={
                    "rounded-full px-3 py-1 text-xs font-medium transition " +
                    (filter === "all"
                      ? "bg-amber-500 text-slate-950"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700 light:bg-slate-100 light:text-slate-700")
                  }
                >
                  All
                </button>
                {DOCUMENT_CATEGORIES.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setFilter(c.value)}
                    className={
                      "rounded-full px-3 py-1 text-xs font-medium transition " +
                      (filter === c.value
                        ? "bg-amber-500 text-slate-950"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700 light:bg-slate-100 light:text-slate-700")
                    }
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-sm text-red-400 mb-4">{error}</p>}
            {loading ? (
              <p className="text-sm text-slate-400">Load ho raha hai...</p>
            ) : filteredAndSearched.length === 0 ? (
              <p className="text-sm text-slate-400">Koi document nahi mila.</p>
            ) : (
              <ul className="space-y-2">
                {filteredAndSearched.map((j) => (
                  <li
                    key={j.id}
                    className="flex items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-950/50 px-3 py-2.5 light:border-slate-200 light:bg-slate-50"
                  >
                    <button
                      onClick={() => handleView(j.id)}
                      className="flex min-w-0 flex-1 items-center gap-3 text-left text-sm text-slate-200 hover:text-amber-300 light:text-slate-800"
                    >
                      <FileText className="h-4 w-4 shrink-0 text-amber-400" />
                      <span className="truncate">
                        <span className="mr-2 rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-300">
                          {categoryLabel(j.category)}
                        </span>
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
  );
}
