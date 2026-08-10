"use client";

import Sidebar from "@/components/Sidebar";
import RequireAdmin from "@/components/RequireAdmin";
import { Library } from "lucide-react";

export default function AdminPage() {
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
                Yahan se aap judgment PDFs upload kar sakenge jo sabhi users ko read-only dikhengi. Upload feature jald hi yahan aayega.
              </p>
            </section>
          </div>
        </main>
      </div>
    </RequireAdmin>
  );
}