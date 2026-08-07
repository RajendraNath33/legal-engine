"use client";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { generateCitation, type CitationFormat, type CitationInputType } from "@/lib/legal-engine";
import { BookOpen, Copy, CheckCircle2, Save, FileText, FileType, BookMarked, ScrollText, GraduationCap } from "lucide-react";

const TYPES: { id: CitationInputType; label: string; icon: any }[] = [
  { id: "case", label: "Case Law", icon: FileText },
  { id: "act", label: "Statute / Act", icon: ScrollText },
  { id: "book", label: "Book", icon: BookMarked },
  { id: "article", label: "Journal Article", icon: BookOpen },
  { id: "thesis", label: "Thesis / Dissertation", icon: GraduationCap },
];

const FIELDS: Record<CitationInputType, { key: string; label: string; placeholder?: string; multi?: boolean }[]> = {
  case: [
    { key: "caseName", label: "Case Name (italicised by convention)", placeholder: "Kesavananda Bharati v. State of Kerala" },
    { key: "volume", label: "Volume", placeholder: "(1973) 4 SCC" },
    { key: "reporter", label: "Reporter", placeholder: "SCC" },
    { key: "page", label: "First page of the report" },
    { key: "court", label: "Court", placeholder: "SC / Delhi HC" },
    { key: "year", label: "Year", placeholder: "1973" },
  ],
  book: [
    { key: "author", label: "Author(s)", placeholder: "V.N. Shukla" },
    { key: "title", label: "Title", placeholder: "Constitution of India" },
    { key: "edition", label: "Edition", placeholder: "13th edn" },
    { key: "publisher", label: "Publisher", placeholder: "EBC" },
    { key: "year", label: "Year", placeholder: "2022" },
    { key: "page", label: "Pin-point page (optional)" },
  ],
  article: [
    { key: "author", label: "Author(s)" },
    { key: "title", label: "Article Title" },
    { key: "volume", label: "Volume" },
    { key: "journal", label: "Journal", placeholder: "JILI / SCC Jnl" },
    { key: "page", label: "First page" },
    { key: "year", label: "Year" },
  ],
  act: [
    { key: "title", label: "Act Title", placeholder: "Negotiable Instruments Act" },
    { key: "year", label: "Year", placeholder: "1881" },
    { key: "number", label: "Act Number (optional)" },
  ],
  thesis: [
    { key: "author", label: "Author" },
    { key: "title", label: "Thesis Title" },
    { key: "thesisType", label: "Type", placeholder: "PhD / LLM" },
    { key: "university", label: "University" },
    { key: "year", label: "Year" },
  ],
};

export default function CitationsClient() {
  const [format, setFormat] = useState<CitationFormat>("bluebook");
  const [type, setType] = useState<CitationInputType>("case");
  const [data, setData] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const formatted = generateCitation(format, type, data);

  async function copy() {
    await navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }
  async function save() {
    const { error } = await supabase.from("citations").insert({
      format,
      input_type: type,
      raw: JSON.stringify(data),
      formatted,
    });
    if (error) {
      console.error(error);
      alert("Save failed: " + error.message);
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  }

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-x-hidden px-4 py-6 sm:px-8 sm:py-8">
        <header className="mb-6">
          <div className="text-xs uppercase tracking-[0.25em] text-amber-400">Module 03</div>
          <h1 className="mt-1 text-2xl font-semibold text-slate-100 light:text-slate-900">Citation Generator — Bluebook / OSCOLA</h1>
          <p className="mt-1 text-sm text-slate-400 light:text-slate-600">Instant footnotes and bibliography entries for Indian and international legal sources.</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-5">
          <section className="card p-5 lg:col-span-2">
            <div className="mb-4">
              <label className="label">Citation style</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setFormat("bluebook")}
                  className={"rounded-lg border px-3 py-2 text-sm font-semibold transition " + (format === "bluebook" ? "border-amber-500/50 bg-amber-500/15 text-amber-200" : "border-slate-700/70 bg-slate-900/60 text-slate-300 hover:border-amber-500/30 light:bg-white light:border-slate-200 light:text-slate-700")}
                >
                  Bluebook (21st ed.)
                </button>
                <button
                  onClick={() => setFormat("oscola")}
                  className={"rounded-lg border px-3 py-2 text-sm font-semibold transition " + (format === "oscola" ? "border-amber-500/50 bg-amber-500/15 text-amber-200" : "border-slate-700/70 bg-slate-900/60 text-slate-300 hover:border-amber-500/30 light:bg-white light:border-slate-200 light:text-slate-700")}
                >
                  OSCOLA (4th ed.)
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="label">Source type</label>
              <div className="grid grid-cols-2 gap-2">
                {TYPES.map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => { setType(t.id); setData({}); }}
                      className={"flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition " + (type === t.id ? "border-amber-500/50 bg-amber-500/15 text-amber-200" : "border-slate-700/70 bg-slate-900/60 text-slate-300 hover:border-amber-500/30 light:bg-white light:border-slate-200 light:text-slate-700")}
                    >
                      <Icon className="h-4 w-4" /> {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              {FIELDS[type].map((f) => (
                <div key={f.key}>
                  <label className="label">{f.label}</label>
                  {f.multi ? (
                    <textarea rows={3} className="input" placeholder={f.placeholder} value={data[f.key] || ""} onChange={(e) => setData({ ...data, [f.key]: e.target.value })} />
                  ) : (
                    <input className="input" placeholder={f.placeholder} value={data[f.key] || ""} onChange={(e) => setData({ ...data, [f.key]: e.target.value })} />
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4 lg:col-span-3">
            <div className="card p-5">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-200 light:text-slate-900">
                  <FileType className="h-4 w-4 text-amber-300" />
                  Formatted citation
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={copy} className="btn-ghost text-xs">
                    {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button onClick={save} className="btn-primary text-xs">
                    {saved ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
                    {saved ? "Saved" : "Save"}
                  </button>
                </div>
              </div>
              <div className="rounded-lg border border-slate-800/70 bg-slate-950/60 p-4 font-legal text-sm leading-relaxed text-slate-100 light:bg-slate-50 light:text-slate-900 light:border-slate-200">
                {formatted}
              </div>
              <div className="mt-3 text-[11px] text-slate-500">
                Tip: For footnotes, Bluebook uses a short form after first citation. OSCOLA uses ibid / n above/below conventions automatically.
              </div>
            </div>

            <div className="card p-5">
              <h3 className="mb-3 text-sm font-semibold text-slate-200 light:text-slate-900">Quick examples</h3>
              <ul className="space-y-2 text-xs text-slate-400 light:text-slate-600">
                <li><span className="font-mono text-amber-300">Case:</span> Kesavananda Bharati v. State of Kerala, (1973) 4 SCC 225 (SC 1973).</li>
                <li><span className="font-mono text-amber-300">Book:</span> V.N. Shukla, Constitution of India (13th edn, EBC 2022).</li>
                <li><span className="font-mono text-amber-300">Article:</span> Upendra Baxi, 'The Indian Supreme Court and Politics' (1980) 4 JILI 1.</li>
                <li><span className="font-mono text-amber-300">Act:</span> Negotiable Instruments Act, 1881 (India), No. 26 of 1881.</li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
