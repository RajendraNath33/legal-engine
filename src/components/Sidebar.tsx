"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scale, FileText, BookOpen, BrainCircuit, GraduationCap, Moon, Sun, Sparkles, ShieldCheck } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: Sparkles },
  { href: "/draft", label: "Drafting Assistant", icon: FileText },
  { href: "/research", label: "Multi-Case Analyzer", icon: BrainCircuit },
  { href: "/citations", label: "Citation Generator", icon: BookOpen },
  { href: "/prep", label: "Exam Prep", icon: GraduationCap },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <aside className="flex h-full w-full shrink-0 flex-col border-b border-amber-500/10 bg-slate-950/90 px-4 py-4 text-slate-200 dark:bg-slate-950/90 light:bg-white light:border-slate-200 light:text-slate-800 lg:w-72 lg:border-r lg:border-b-0 lg:px-5 lg:py-6">
      <Link href="/dashboard" className="group mb-4 flex items-center gap-3 lg:mb-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20">
          <Scale className="h-6 w-6" strokeWidth={2.3} />
        </div>
        <div>
          <div className="text-base font-semibold leading-tight tracking-tight text-amber-300 group-hover:text-amber-200">
            Legal Mitra
          </div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Draft • Research • Prep</div>
        </div>
      </Link>

      <nav className="flex-1 space-y-1">
        {nav.map((n) => {
          const Icon = n.icon;
          const active = pathname === n.href || pathname?.startsWith(n.href + "/");
          return (
            <Link
              key={n.href}
              href={n.href}
              aria-current={active ? "page" : undefined}
              className={
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition " +
                (active
                  ? "bg-amber-500/15 text-amber-200 ring-1 ring-amber-500/30"
                  : "text-slate-400 hover:bg-slate-800/60 hover:text-amber-200 light:hover:bg-slate-100 light:text-slate-600")
              }
            >
              <Icon className={"h-4.5 w-4.5 " + (active ? "text-amber-300" : "text-slate-500 group-hover:text-amber-300")} strokeWidth={1.8} />
              <span className="font-medium">{n.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 space-y-3">
        <div className="rounded-xl border border-amber-500/10 bg-slate-900/60 p-3 text-xs text-slate-400 light:bg-slate-100 light:border-slate-200">
          <div className="mb-1 flex items-center gap-2 text-amber-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span className="font-semibold tracking-wide">End-to-end encrypted</span>
          </div>
          Your drafts and client data stay on your device & encrypted cloud storage.
        </div>
        <button
          onClick={toggle}
          className="flex w-full items-center justify-between rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-300 transition hover:border-amber-500/30 hover:text-amber-200 light:border-slate-200 light:bg-slate-50 light:text-slate-700"
        >
          <span className="flex items-center gap-2">
            {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            {theme === "dark" ? "Dark" : "Light"} Mode
          </span>
          <span className="text-xs text-slate-500">Toggle</span>
        </button>
        <div className="pt-3 flex flex-col items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500">
          <div className="flex gap-3 flex-wrap justify-center">
            <Link href="/about" className="hover:text-amber-300 transition">About</Link>
            <Link href="/terms" className="hover:text-amber-300 transition">Terms</Link>
            <Link href="/privacy" className="hover:text-amber-300 transition">Privacy</Link>
            <Link href="/refund" className="hover:text-amber-300 transition">Refund Policy</Link>
          </div>
          <div className="mt-1">Vidhi Mitra - Divya Seva CSC Kendra</div>
        </div>
      </div>
    </aside>
  );
}
