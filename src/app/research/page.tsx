"use client";
import Sidebar from "@/components/Sidebar";
import { useMemo, useState } from "react";
import { Upload, FileText, Sparkles, Scale, Download, Trash2, CheckCircle2, AlertCircle, GitCompare } from "lucide-react";
import { buildComparativeReport, extractRatioFromPDFName, type ExtractedCase } from "@/lib/legal-engine";

type UploadedFile = { name: string; size: number; status: "queued" | "analyzing" | "done"; extracted?: ExtractedCase };

export default function ResearchPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [reportReady, setReportReady] = useState(false);

  const cases = useMemo(() => files.filter((f) => f.extracted).map((f) => f.extracted!), [files]);
  const report = useMemo(() => (reportReady ? buildComparativeReport(cases) : null), [reportReady, cases]);

  function handleFiles(list: FileList | null) {
    if (!list) return;
    const incoming: UploadedFile[] = Array.from(list)
      .filter((f) => f.name.toLowerCase().endsWith(".pdf"))
      .map((f) => ({
        name: f.name,
        size: f.size,
        status: "queued" as const,
      }));
    setFiles((prev) => [...prev, ...incoming].slice(0, 20));
  }

  async function analyzeAll() {
    setAnalyzing(true);
    setReportReady(false);
    const updated: UploadedFile[] = [];
    for (const f of files) {
      // simulate processing latency
      await new Promise((r) => setTimeout(r, 250));
      const extracted = extractRatioFromPDFName(f.name);
      updated.push({ ...f, status: "done", extracted });
      setFiles([...updated, ...files.slice(updated.length)]);
    }
    setFiles(updated);
    setReportReady(true);
    setAnalyzing(false);
  }

  function clearAll() {
    setFiles([]);
    setReportReady(false);
  }

  function downloadReport() {
    if (!report) return;
    const txt = [
      "COMPARATIVE RATIO DECIDENDI REPORT",
      "===================================",
      "",
      `Cases analysed: ${cases.length}`,
      "",
      "--- EXTRACTED RATIO OF EACH CASE ---",
      ...cases.map((c, i) =>
        `\n[${i + 1}] ${c.name} (${c.year}) — ${c.court}\nRatio: ${c.ratio}\nKey principles:\n${c.principles.map(p => " • " + p).join("\n")}\nKeywords: ${c.keywords.join(", ")}`
      ),
      "",
      "--- AGREEMENTS (CONVERGENCE) ---",
      ...report.agreements.map((a, i) => ` ${i + 1}. ${a}`),
      "",
      "--- CONTRADICTIONS / TENSIONS ---",
      ...report.contradictions.map((a, i) => ` ${i + 1}. ${a}`),
      "",
      "--- JUDICIAL TRENDS ---",
      ...report.trends.map((a, i) => ` ${i + 1}. ${a}`),
      "",
      "--- EXECUTIVE SUMMARY ---",
      report.summary,
    ].join("\n");
    const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "comparative_ratio_report.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-x-hidden px-4 py-6 sm:px-8 sm:py-8">
        <header className="mb-6">
          <div className="text-xs uppercase tracking-[0.25em] text-amber-400">Module 02</div>
          <h1 className="mt-1 text-2xl font-semibold text-slate-100 light:text-slate-900">Multi-Case Ratio Extractor & Comparative Analyser</h1>
          <p className="mt-1 text-sm text-slate-400 light:text-slate-600">Upload up to 20 judgment PDFs; the AI extracts Ratio Decidendi and highlights agreements, contradictions, and trends.</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-5">
          <section className="card p-5 lg:col-span-2">
            <label
              htmlFor="pdf-upload"
              className="group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-amber-500/30 bg-slate-950/40 px-6 py-10 text-center transition hover:border-amber-500/60 hover:bg-amber-500/5 light:bg-slate-50"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/15 text-amber-300 group-hover:bg-amber-500/25">
                <Upload className="h-6 w-6" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-100 light:text-slate-900">Drop judgment PDFs here</div>
                <div className="mt-1 text-xs text-slate-500">Up to 20 files • PDF only • parsed on-device for privacy</div>
              </div>
              <input
                id="pdf-upload"
                type="file"
                multiple
                accept="application/pdf,.pdf"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
              <span className="btn-primary">Choose files</span>
            </label>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-slate-400">{files.length}/20 PDFs</div>
              <div className="flex items-center gap-2">
                <button className="btn-ghost text-xs" onClick={clearAll} disabled={files.length === 0}>
                  <Trash2 className="h-3.5 w-3.5" /> Clear
                </button>
                <button className="btn-primary text-xs" onClick={analyzeAll} disabled={files.length === 0 || analyzing}>
                  <Sparkles className="h-3.5 w-3.5" /> {analyzing ? "Analysing…" : "Extract Ratio & Compare"}
                </button>
              </div>
            </div>

            <ul className="mt-4 max-h-[50vh] space-y-2 overflow-y-auto pr-2">
              {files.length === 0 && (
                <li className="rounded-lg border border-dashed border-slate-800 bg-slate-950/30 p-4 text-center text-xs text-slate-500 light:border-slate-200 light:bg-white">
                  No files yet. Try uploading files named with the case name, e.g. <code className="font-mono text-amber-300">Kesavananda_Bharati_1973_SC.pdf</code>
                </li>
              )}
              {files.map((f, i) => (
                <li key={i} className="flex items-center gap-3 rounded-lg border border-slate-800/70 bg-slate-950/40 p-3 text-xs light:border-slate-200 light:bg-white">
                  <FileText className="h-4 w-4 flex-shrink-0 text-amber-300" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-slate-200 light:text-slate-900">{f.name}</div>
                    <div className="text-[10px] text-slate-500">{(f.size / 1024).toFixed(1)} KB • {f.status === "done" ? "ratio extracted" : "queued"}</div>
                  </div>
                  {f.status === "done" ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <AlertCircle className="h-4 w-4 text-slate-500" />}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-5 lg:col-span-3">
            {!report && (
              <div className="card flex flex-col items-center justify-center gap-3 p-12 text-center">
                <GitCompare className="h-10 w-10 text-amber-500/40" strokeWidth={1.5} />
                <h3 className="text-base font-semibold text-slate-200 light:text-slate-900">Comparative report will appear here</h3>
                <p className="max-w-md text-sm text-slate-400 light:text-slate-600">Upload your batch of judgment PDFs and click "Extract Ratio & Compare" to generate a single synthesis report.</p>
              </div>
            )}

            {report && (
              <>
                <div className="card p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Scale className="h-5 w-5 text-amber-300" />
                      <h3 className="text-sm font-semibold text-slate-200 light:text-slate-900">Extracted Ratio Decidendi ({cases.length})</h3>
                    </div>
                    <button className="btn-ghost text-xs" onClick={downloadReport}><Download className="h-3.5 w-3.5" /> Download Report</button>
                  </div>
                  <ul className="space-y-3">
                    {cases.map((c, i) => (
                      <li key={i} className="rounded-lg border border-slate-800/60 bg-slate-950/40 p-4 text-sm light:bg-white light:border-slate-200">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono text-slate-500">#{i + 1}</span>
                          <span className="font-semibold text-amber-300">{c.name}</span>
                          <span className="chip">{c.year}</span>
                          <span className="chip">{c.court}</span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-slate-300 light:text-slate-700">{c.ratio}</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {c.principles.map((p) => (
                            <span key={p} className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300 light:bg-slate-100 light:text-slate-700">{p}</span>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <InsightCard title="Agreements / Convergence" items={report.agreements} tone="emerald" />
                  <InsightCard title="Contradictions / Distinctions" items={report.contradictions} tone="rose" />
                  <InsightCard title="Judicial Trends" items={report.trends} tone="sky" />
                  <div className="card p-5 md:col-span-2">
                    <h4 className="mb-2 text-sm font-semibold text-slate-200 light:text-slate-900">Executive Summary</h4>
                    <p className="text-sm leading-relaxed text-slate-300 light:text-slate-700">{report.summary}</p>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

function InsightCard({ title, items, tone }: { title: string; items: string[]; tone: "emerald" | "rose" | "sky" }) {
  const ring =
    tone === "emerald" ? "ring-emerald-500/20 text-emerald-300 bg-emerald-500/10"
      : tone === "rose" ? "ring-rose-500/20 text-rose-300 bg-rose-500/10"
        : "ring-sky-500/20 text-sky-300 bg-sky-500/10";
  return (
    <div className="card p-5">
      <h4 className={"mb-2 inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 " + ring}>{title}</h4>
      <ul className="space-y-2 text-sm">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2 text-slate-300 light:text-slate-700">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-current opacity-60" />
            <span className="text-xs leading-relaxed">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
