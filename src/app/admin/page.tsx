"use client";

import { useCallback, useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import RequireAdmin from "@/components/RequireAdmin";
import { useAuth } from "@/components/AuthProvider";
import { Library, Upload, Trash2, FileText, Loader2 } from "lucide-react";

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

export default function AdminPage() {
  const { user } = useAuth();
  const [judgments, setJudgments] = useState<JudgmentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

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

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !file || !title.trim()) return;
    setUploading(true);
    setError(null);
    try {
      const idToken = await user.getIdToken();
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("file", file);
      const res = await fetch("/api/judgments", {
        method: "POST",
        headers: { Authorization: `Bearer ${idToken}` },
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Upload fail ho gaya");
      }
      setTitle("");
      setFile(null);
      const fileInput = document.getElementById("judgment-file-input") as HTMLInputElement | null;
      if (fileInput) fileInput.value = "";
      await loadJudgments();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload fail ho gaya");
    } finally {
      setUploading(false);
    }
  };

  const handleView = async (id: number) => {
    if (!user) return;
    try {
      const idToken = await user.getIdToken();
      const res = await fetch(`/api/judgments/${id}`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!res.ok) throw new Error("PDF load nahi ho payi");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch {
      setError("PDF khulne mein error aayi.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!user) return;
    if (!confirm("Ye judgment PDF delete kar dein? Ye sabhi users ke liye hat jayegi.")) return;
    setDeletingId(id);
    try {
      const idToken = await user.getIdToken();
      await fetch(`/api/judgments/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${idToken}` },
      });
      await loadJudgments();
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <RequireAdmin>
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-x-hidden">
          <div className="relative px-4 py-6 sm:px-8 sm:py-10">
            <section className="mb-6 rounded-3xl border border-amber-500/20 bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-950 p-5 shadow-2xl shadow-amber-900/10 sm:p-8 light:from-white light:via-amber-50 light:to-white">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-300 sm:text-xs">
                <Library className="h-3.5 w-3.5" />
                Admin Panel
              </div>
              <h1 className="text-2xl font-semibold leading-tight tracking-tight text-slate-100 sm:text-3xl light:text-slate-900">
                Judgment Library
              </h1>
              <p className="mt-3 text-base leading-relaxed text-slate-400 light:text-slate-600">
                Yahan se judgment PDFs upload karein — ye sabhi users ko read-only dikhengi.
              </p>
            </section>

            <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 light:border-slate-200 light:bg-white">
              <h2 className="mb-4 text-lg font-semibold text-slate-100 light:text-slate-900">Nayi Judgment Upload Karein</h2>
              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm text-slate-400 light:text-slate-600">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Kesavananda Bharati vs State of Kerala"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-amber-500/50 light:border-slate-300 light:bg-slate-50 light:text-slate-900"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-slate-400 light:text-slate-600">PDF File (max 25MB)</label>
                  <input
                    id="judgment-file-input"
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none file:mr-3 file:rounded-md file:border-0 file:bg-amber-500/20 file:px-3 file:py-1.5 file:text-amber-200 light:border-slate-300 light:bg-slate-50 light:text-slate-900"
                    required
                  />
                </div>
                {error && <p className="text-sm text-red-400">{error}</p>}
                <button
                  type="submit"
                  disabled={uploading}
                  className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 disabled:opacity-60"
                >
                  {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  {uploading ? "Upload ho raha hai..." : "Upload Karein"}
                </button>
              </form>
            </section>

            <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 light:border-slate-200 light:bg-white">
              <h2 className="mb-4 text-lg font-semibold text-slate-100 light:text-slate-900">Sabhi Judgments ({judgments.length})</h2>
              {loading ? (
                <p className="text-sm text-slate-400">Load ho raha hai...</p>
              ) : judgments.length === 0 ? (
                <p className="text-sm text-slate-400">Abhi tak koi judgment upload nahi hui.</p>
              ) : (
                <ul className="space-y-2">
                  {judgments.map((j) => (
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
                          {j.title}
                          <span className="ml-2 text-xs text-slate-500">{formatSize(j.fileSize)}</span>
                        </span>
                      </button>
                      <button
                        onClick={() => handleDelete(j.id)}
                        disabled={deletingId === j.id}
                        className="shrink-0 rounded-lg border border-red-500/20 bg-red-500/10 p-2 text-red-300 transition hover:bg-red-500/20 disabled:opacity-50"
                        aria-label="Delete"
                      >
                        {deletingId === j.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </main>
      </div>
    </RequireAdmin>
  );
}
