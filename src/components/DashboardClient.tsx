"use client";

import Sidebar from "@/components/Sidebar";
import { FileText, BrainCircuit, BookOpen, GraduationCap, ShieldCheck, Zap, Lock, Sparkles, HardDrive } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/config";

export default function DashboardClient() {
  const [driveAuthUrl, setDriveAuthUrl] = useState(`${API_BASE_URL}/api/auth/google/authorize`);
  const modules = [
    {
      href: "/draft",
      icon: FileText,
      title: "AI Legal Drafting Assistant",
      desc: "Voice-to-draft for NI-138 notices, bail, writs, consumer complaints, SLP and written statements. Precedent-embedded suggestions and tone checker.",
      accent: "from-amber-500/20 to-amber-700/5",
      iconColor: "text-amber-300",
      bullets: ["Voice-to-draft rough notes", "Jurisdiction-wise templates", "Precedent suggestions", "Tone & compliance check"],
    },
    {
      href: "/research",
      icon: BrainCircuit,
      title: "Multi-Case Ratio Extractor",
      desc: "Upload 10–20 judgment PDFs and extract Ratio Decidendi, agreements, contradictions and judicial trends in a single comparative report.",
      accent: "from-emerald-500/20 to-emerald-700/5",
      iconColor: "text-emerald-300",
      bullets: ["Batch PDF upload", "Automated ratio synthesis", "Trend analysis", "Downloadable report"],
    },
    {
      href: "/citations",
      icon: BookOpen,
      title: "Citation Generator",
      desc: "Instant footnotes and bibliographies in Bluebook (21st ed.) and OSCOLA 4th ed. for cases, books, articles, acts and theses.",
      accent: "from-sky-500/20 to-sky-700/5",
      iconColor: "text-sky-300",
      bullets: ["Bluebook & OSCOLA", "Cases, books, articles", "Acts & theses", "One-click copy"],
    },
    {
      href: "/prep",
      icon: GraduationCap,
      title: "Exam Prep: Flashcards & Mocks",
      desc: "Smart flashcards for 100+ landmark Supreme Court judgments and adaptive AI mock tests for judiciary and law exams.",
      accent: "from-fuchsia-500/20 to-fuchsia-700/5",
      iconColor: "text-fuchsia-300",
      bullets: ["Landmark-judgment cards", "Spaced-repetition ready", "Adaptive MCQs", "Weak-area detection"],
    },
  ];

  useEffect(() => {
    const getToken = async () => {
      if (!auth?.currentUser) return;
      const token = await auth.currentUser.getIdToken();
      setDriveAuthUrl(`${API_BASE_URL}/api/auth/google/authorize?idToken=${encodeURIComponent(token)}`);
    };

    getToken();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-x-hidden">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.08),transparent_60%)]" />
          <div className="relative px-4 py-6 sm:px-8 sm:py-10">
            {/* Hero */}
            <section className="mb-10 rounded-3xl border border-amber-500/20 bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-950 p-5 shadow-2xl shadow-amber-900/10 sm:p-8 light:from-white light:via-amber-50 light:to-white">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <div className="mb-3 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-300 sm:text-xs">
                    <Sparkles className="h-3.5 w-3.5" />
                    Legal Research • Drafting • Prep
                  </div>
                  <h1 className="text-2xl font-semibold leading-tight tracking-tight text-slate-100 sm:text-3xl md:text-4xl light:text-slate-900">
                    Welcome to <span className="gold-text">Legal Mitra</span>
                  </h1>
                  <p className="mt-3 text-base leading-relaxed text-slate-400 light:text-slate-600">
                    The all-in-one platform for Indian advocates, LLM/Ph.D. scholars, law students, and judiciary aspirants — draft smarter, research faster, and prep smarter with AI that knows Indian law.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href="/draft" className="btn-primary">
                      <FileText className="h-4 w-4" /> Start Drafting
                    </Link>
                    <Link href="/research" className="btn-ghost">
                      <BrainCircuit className="h-4 w-4" /> Analyse Cases
                    </Link>
                    <a
                      href={driveAuthUrl}
                      className="btn-outline"
                    >
                      <HardDrive className="h-4 w-4" /> Connect Drive
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
