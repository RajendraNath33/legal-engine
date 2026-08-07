"use client";
import Sidebar from "@/components/Sidebar";
import { useEffect, useMemo, useState } from "react";
import { LANDMARK_CASES, QUESTION_BANK } from "@/lib/legal-engine";
import { GraduationCap, RotateCcw, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Sparkles, BrainCircuit, BookmarkCheck, Trophy } from "lucide-react";

type Mode = "flashcards" | "mock";

export default function PrepClient() {
  const [mode, setMode] = useState<Mode>("flashcards");
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-x-hidden px-4 py-6 sm:px-8 sm:py-8">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">Module 04</div>
            <h1 className="mt-1 text-2xl font-semibold text-slate-100 light:text-slate-900">Exam Prep — Flashcards & Adaptive Mocks</h1>
            <p className="mt-1 text-sm text-slate-400 light:text-slate-600">Landmark judgment flashcards and AI-adaptive MCQs for judiciary and law exams.</p>
          </div>
          <div className="flex gap-2 rounded-xl border border-slate-800/70 bg-slate-900/50 p-1 light:border-slate-200 light:bg-white">
            <button className="tab" data-active={mode === "flashcards"} onClick={() => setMode("flashcards")}>
              <BookmarkCheck className="h-4 w-4" /> Flashcards
            </button>
            <button className="tab" data-active={mode === "mock"} onClick={() => setMode("mock")}>
              <BrainCircuit className="h-4 w-4" /> Adaptive Mock Test
            </button>
          </div>
        </header>

        {mode === "flashcards" ? <Flashcards /> : <MockTest />}
      </main>
    </div>
  );
}

function Flashcards() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState<"all" | "known" | "unknown">("all");

  const visibleCases = useMemo(() => {
    if (filter === "known") return LANDMARK_CASES.filter((c) => known[c.id]);
    if (filter === "unknown") return LANDMARK_CASES.filter((c) => !known[c.id]);
    return LANDMARK_CASES;
  }, [filter, known]);

  const current = visibleCases[index];

  useEffect(() => {
    setFlipped(false);
  }, [index]);

  if (visibleCases.length === 0) {
    return (
      <div className="card p-8 text-center text-sm text-slate-400">
        No cards in this filter. <button onClick={() => setFilter("all")} className="text-amber-300 underline">Show all</button>
      </div>
    );
  }

  function markKnown(val: boolean) {
    setKnown((k) => ({ ...k, [current.id]: val }));
    goNext();
  }
  function goNext() {
    setIndex((i) => (i + 1) % visibleCases.length);
  }
  function goPrev() {
    setIndex((i) => (i - 1 + visibleCases.length) % visibleCases.length);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-3 lg:col-span-1">
        <div className="card p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-200 light:text-slate-900">Filter</h3>
          <div className="flex gap-2">
            {(["all", "unknown", "known"] as const).map((f) => (
              <button
                key={f}
                onClick={() => { setFilter(f); setIndex(0); }}
                className={
                  "flex-1 rounded-lg border px-3 py-1.5 text-xs font-medium capitalize transition " +
                  (filter === f
                    ? "border-amber-500/40 bg-amber-500/15 text-amber-200"
                    : "border-slate-700/70 bg-slate-900/60 text-slate-400 hover:border-amber-500/30 light:bg-white light:border-slate-200 light:text-slate-600")
                }
              >
                {f}
              </button>
            ))}
          </div>
          <div className="mt-4 text-xs text-slate-400">
            Mastered: <span className="font-semibold text-emerald-300">{Object.values(known).filter(Boolean).length}</span> / {LANDMARK_CASES.length}
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300" style={{ width: `${(Object.values(known).filter(Boolean).length / LANDMARK_CASES.length) * 100}%` }} />
          </div>
        </div>
        <div className="card p-4">
          <h3 className="mb-2 text-sm font-semibold text-slate-200 light:text-slate-900">All Landmark Cases</h3>
          <ul className="max-h-[52vh] space-y-1 overflow-y-auto pr-1">
            {LANDMARK_CASES.map((c) => {
              const isCurrent = visibleCases[index]?.id === c.id && filter !== "all" ? false : visibleCases[index]?.id === c.id;
              return (
                <li key={c.id}>
                  <button
                    onClick={() => {
                      const pos = visibleCases.findIndex((v) => v.id === c.id);
                      if (pos >= 0) setIndex(pos);
                      else { setFilter("all"); setIndex(LANDMARK_CASES.findIndex((v) => v.id === c.id)); }
                    }}
                    className={
                      "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-xs transition " +
                      (isCurrent
                        ? "bg-amber-500/15 text-amber-200 ring-1 ring-amber-500/30"
                        : "text-slate-400 hover:bg-slate-800/50 light:hover:bg-slate-100")
                    }
                  >
                    <span className="truncate">{c.name}</span>
                    <span className="ml-2 text-[10px] text-slate-500">{c.year}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="card p-2">
          <div
            className="relative flex min-h-[380px] cursor-pointer flex-col justify-between rounded-xl border border-slate-800/70 bg-gradient-to-br from-slate-950 to-slate-900 p-6 transition light:from-white light:to-amber-50 light:border-slate-200"
            onClick={() => setFlipped((f) => !f)}
          >
            <div className="flex items-center justify-between text-xs">
              <span className="chip">{current.area}</span>
              <span className="text-slate-500">Card {index + 1} / {visibleCases.length} • click to flip</span>
            </div>
            <div className="py-8">
              {!flipped ? (
                <>
                  <div className="text-[11px] uppercase tracking-widest text-amber-400">Case Name</div>
                  <h2 className="mt-2 text-2xl font-semibold leading-tight text-slate-100 light:text-slate-900">{current.name}</h2>
                  <p className="mt-3 text-sm text-slate-400">{current.flashcardHint}</p>
                </>
              ) : (
                <>
                  <div className="text-[11px] uppercase tracking-widest text-amber-400">Ratio Decidendi</div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-200 light:text-slate-800">{current.ratio}</p>
                  <div className="mt-4">
                    <div className="text-[11px] uppercase tracking-widest text-amber-400">Key Principles</div>
                    <ul className="mt-1 space-y-1 text-sm text-slate-300 light:text-slate-700">
                      {current.principles.map((p) => (
                        <li key={p} className="flex gap-2"><span className="mt-1 h-1 w-1 rounded-full bg-amber-400" /> {p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-3 text-xs text-slate-500">{current.citation} • {current.bench}</div>
                </>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={(e) => { e.stopPropagation(); markKnown(false); }}
                className="inline-flex items-center gap-1 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-300 hover:bg-rose-500/20"
              >
                <XCircle className="h-3.5 w-3.5" /> Still learning
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setFlipped((f) => !f); }}
                className="btn-ghost text-xs py-1.5"><RotateCcw className="h-3.5 w-3.5" /> Flip</button>
              <button
                onClick={(e) => { e.stopPropagation(); markKnown(true); }}
                className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300 hover:bg-emerald-500/20"
              >
                <CheckCircle2 className="h-3.5 w-3.5" /> I know this
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between p-3">
            <button onClick={goPrev} className="btn-ghost text-xs"><ChevronLeft className="h-3.5 w-3.5" /> Previous</button>
            <button onClick={() => setFlipped((f) => !f)} className="btn-primary text-xs"><Sparkles className="h-3.5 w-3.5" /> Reveal Answer</button>
            <button onClick={goNext} className="btn-ghost text-xs">Next <ChevronRight className="h-3.5 w-3.5" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockTest() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<{ q: string; correct: boolean; topic: string }[]>([]);

  const questions = useMemo(() => {
    return [...QUESTION_BANK].sort(() => Math.random() - 0.5).slice(0, Math.min(10, QUESTION_BANK.length));
  }, [started]);

  const q = questions[index];
  const score = answers.filter((a) => a.correct).length;

  function choose(i: number) {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    setAnswers((a) => [...a, { q: q.q, correct: i === q.answer, topic: topicOf(q.q) }]);
  }
  function next() {
    if (index + 1 >= questions.length) {
      setDone(true);
      return;
    }
    setIndex(index + 1);
    setSelected(null);
    setRevealed(false);
  }
  function goPrev() {
    if (index === 0) return;
    setIndex(index - 1);
    setSelected(null);
    setRevealed(false);
  }
  function reset() {
    setStarted(false);
    setDone(false);
    setIndex(0);
    setSelected(null);
    setRevealed(false);
    setAnswers([]);
  }

  const weakAreas = useMemo(() => {
    const counts: Record<string, number> = {};
    answers.filter((a) => !a.correct).forEach((a) => { counts[a.topic] = (counts[a.topic] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [answers]);

  const [done, setDone] = useState(false);

  if (!started) {
    return (
      <div className="card mx-auto max-w-2xl p-8 text-center">
        <GraduationCap className="mx-auto h-12 w-12 text-amber-300" strokeWidth={1.5} />
        <h2 className="mt-4 text-xl font-semibold text-slate-100 light:text-slate-900">Adaptive Mock Test (Judiciary / Law Exams)</h2>
        <p className="mt-2 text-sm text-slate-400 light:text-slate-600">10 MCQs drawn from a curated bank covering Constitutional law, CrPC, CPC, NI Act, gender justice, and environmental law. Questions adapt to your weak areas.</p>
        <div className="mt-6 grid grid-cols-3 gap-3 text-left text-xs text-slate-400">
          <div className="rounded-lg border border-slate-800/70 bg-slate-950/40 p-3 light:border-slate-200 light:bg-white">
            <div className="text-lg font-semibold text-amber-300">10</div>
            <div>questions</div>
          </div>
          <div className="rounded-lg border border-slate-800/70 bg-slate-950/40 p-3 light:border-slate-200 light:bg-white">
            <div className="text-lg font-semibold text-amber-300">~10 min</div>
            <div>duration</div>
          </div>
          <div className="rounded-lg border border-slate-800/70 bg-slate-950/40 p-3 light:border-slate-200 light:bg-white">
            <div className="text-lg font-semibold text-amber-300">Live</div>
            <div>explanations</div>
          </div>
        </div>
        <button onClick={() => setStarted(true)} className="btn-primary mt-8">
          <Sparkles className="h-4 w-4" /> Begin Test
        </button>
      </div>
    );
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="card mx-auto max-w-2xl p-8">
        <div className="text-center">
          <Trophy className="mx-auto h-12 w-12 text-amber-300" strokeWidth={1.5} />
          <h2 className="mt-3 text-xl font-semibold text-slate-100 light:text-slate-900">Test complete</h2>
          <div className="mt-3 text-5xl font-bold gold-text">{pct}%</div>
          <p className="mt-2 text-sm text-slate-400">You scored {score} out of {questions.length}. {pct >= 80 ? "Excellent work!" : pct >= 60 ? "Good effort — review weak areas below." : "Keep practising — focus on the weak areas."}</p>
        </div>

        {weakAreas.length > 0 && (
          <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
            <h3 className="text-sm font-semibold text-amber-300">Weak areas to review</h3>
            <ul className="mt-2 space-y-1 text-xs text-slate-300">
              {weakAreas.map(([area, count]) => (
                <li key={area} className="flex items-center justify-between">
                  <span>{area}</span>
                  <span className="font-mono text-amber-300">{count} incorrect</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 space-y-2">
          <h3 className="text-sm font-semibold text-slate-200 light:text-slate-900">Answer key</h3>
          {answers.map((a, i) => (
            <div key={i} className={"rounded-lg border p-3 text-xs " + (a.correct ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-300" : "border-rose-500/30 bg-rose-500/5 text-rose-300") }>
              <div className="font-semibold">Q{i + 1}. {a.q}</div>
              <div className="mt-1">{a.correct ? "✓ Correct" : "✗ Incorrect"} — {questions[i].explanation}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button onClick={reset} className="btn-primary"><RotateCcw className="h-4 w-4" /> Take New Test</button>
        </div>
      </div>
    );
  }

  return (
    <div className="card mx-auto max-w-3xl p-6">
      <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
        <span>Question {index + 1} / {questions.length}</span>
        <span>Score: <span className="font-semibold text-emerald-300">{score}</span></span>
      </div>
      <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
        <div className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all" style={{ width: `${(index / questions.length) * 100}%` }} />
      </div>
      <h2 className="mt-6 text-lg font-semibold leading-relaxed text-slate-100 light:text-slate-900">{q.q}</h2>
      <ul className="mt-6 space-y-2">
        {q.options.map((option, i) => (
          <li key={i}>
            <button
              onClick={() => choose(i)}
              className={"w-full rounded-2xl border px-4 py-3 text-left text-sm transition " +
                (revealed && i === q.answer ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-200" : selected === i ? "border-slate-500 bg-slate-900 text-slate-100" : "border-slate-800/70 bg-slate-950/50 text-slate-200 hover:border-amber-500/50 light:bg-white light:text-slate-900")}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between gap-3">
        <button onClick={goPrev} disabled={index === 0} className="btn-ghost text-xs">Previous</button>
        <button onClick={next} className="btn-primary text-xs">{index + 1 === questions.length ? "Finish" : "Next"}</button>
      </div>
    </div>
  );
}

function topicOf(question: string) {
  if (/Constitution|Article|Fundamental/.test(question)) return "Constitutional Law";
  if (/CrPC|charge|bail/.test(question)) return "Criminal Procedure";
  if (/contract|sale|agreement/.test(question)) return "Contract Law";
  if (/evidence|burden|witness/.test(question)) return "Evidence";
  return "General";
}
