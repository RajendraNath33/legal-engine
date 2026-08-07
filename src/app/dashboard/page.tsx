import Sidebar from "@/components/Sidebar";
import { FileText, BrainCircuit, BookOpen, GraduationCap, ShieldCheck, Zap, Lock, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
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

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.08),transparent_60%)]" />
          <div className="relative px-4 py-6 sm:px-8 sm:py-10">
            {/* Hero */}
            <section className="mb-10 rounded-3xl border border-amber-500/20 bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-950 p-8 shadow-2xl shadow-amber-900/10 light:from-white light:via-amber-50 light:to-white">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
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
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 md:w-auto">
                  <Stat icon={ShieldCheck} label="E2E Encrypted" value="SOC-ready" color="text-emerald-300" />
                  <Stat icon={Zap} label="Lightning fast" value="<2s drafts" color="text-amber-300" />
                  <Stat icon={Lock} label="Privacy-first" value="Zero-trust" color="text-sky-300" />
                  <Stat icon={Sparkles} label="Indian courts" value="All forums" color="text-fuchsia-300" />
                </div>
              </div>
            </section>

            {/* Modules */}
            <section>
              <h2 className="mb-4 text-lg font-semibold text-slate-200 light:text-slate-900">Modules</h2>
              <div className="grid gap-5 md:grid-cols-2">
                {modules.map((m) => {
                  const Icon = m.icon;
                  return (
                    <Link
                      key={m.href}
                      href={m.href}
                      className="group relative overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 transition hover:-translate-y-0.5 hover:border-amber-500/30 hover:shadow-xl hover:shadow-amber-900/10 light:bg-white/80 light:border-slate-200"
                    >
                      <div className={"pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60 transition group-hover:opacity-100 " + m.accent} />
                      <div className="relative">
                        <div className="mb-4 flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950/60 ring-1 ring-amber-500/20 light:bg-amber-50 light:ring-amber-200">
                            <Icon className={"h-5 w-5 " + m.iconColor} strokeWidth={2} />
                          </div>
                          <h3 className="text-lg font-semibold text-slate-100 light:text-slate-900">{m.title}</h3>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400 light:text-slate-600">{m.desc}</p>
                        <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-slate-300 light:text-slate-700">
                          {m.bullets.map((b) => (
                            <li key={b} className="flex items-center gap-1.5">
                              <span className="h-1 w-1 rounded-full bg-amber-400" />
                              {b}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-5 flex items-center justify-between text-xs">
                          <span className="font-medium text-amber-300 group-hover:text-amber-200">Open module →</span>
                          <span className="text-slate-500">v1.0</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function Stat({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-800/70 bg-slate-950/40 px-4 py-3 light:border-slate-200 light:bg-white">
      <Icon className={"h-5 w-5 " + color} strokeWidth={2} />
      <div>
        <div className="text-[10px] uppercase tracking-widest text-slate-500">{label}</div>
        <div className="text-sm font-semibold text-slate-200 light:text-slate-900">{value}</div>
      </div>
    </div>
  );
}
