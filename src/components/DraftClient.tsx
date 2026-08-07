"use client";
import Sidebar from "@/components/Sidebar";
import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  DRAFT_TEMPLATES,
  checkToneAndCompliance,
  generateBail,
  generateConsumerComplaint,
  generateCscAffidavit,
  generateCscPoliceComplaint,
  generateCscRentAgreement,
  generateNi138Notice,
  generateSLP,
  generateWritHabeas,
  generateWrittenStatement,
  suggestPrecedents,
  type DraftTemplate,
} from "@/lib/legal-engine";
import {
  Mic,
  MicOff,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Info,
  Save,
  Copy,
  Download,
  Sparkles,
  Volume2,
  RefreshCw,
  ChevronRight,
  ScrollText,
  Shield,
} from "lucide-react";

type Tab = "voice" | "template" | "freeform";

export default function DraftClient() {
  const [tab, setTab] = useState<Tab>("template");
  const [templateId, setTemplateId] = useState<string>(DRAFT_TEMPLATES[0]?.id || "ni-138-notice");
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [freeText, setFreeText] = useState<string>("");
  const [draft, setDraft] = useState<string>("");
  const [draftTitle, setDraftTitle] = useState<string>("");
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState<string>("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const recognitionRef = useRef<any>(null);
  const draftRef = useRef<HTMLDivElement>(null);

  const template = useMemo<DraftTemplate>(
    () => DRAFT_TEMPLATES.find((t) => t.id === templateId) || DRAFT_TEMPLATES[0],
    [templateId]
  );

  const compliance = useMemo(() => checkToneAndCompliance(draft), [draft]);
  const precedents = useMemo(() => (draft ? suggestPrecedents(draft) : []), [draft]);

  function handleGenerate() {
    let output = "";
    switch (templateId) {
      case "ni-138-notice":
        output = generateNi138Notice(inputs);
        break;
      case "bail-437":
        output = generateBail(inputs);
        break;
      case "writ-habeas":
        output = generateWritHabeas(inputs);
        break;
      case "consumer-complaint":
        output = generateConsumerComplaint(inputs);
        break;
      case "written-statement":
        output = generateWrittenStatement(inputs);
        break;
      case "slp-sc":
        output = generateSLP(inputs);
        break;
      case "csc-affidavit":
        output = generateCscAffidavit(inputs);
        break;
      case "csc-rent-agreement":
        output = generateCscRentAgreement(inputs);
        break;
      case "csc-police-complaint":
        output = generateCscPoliceComplaint(inputs);
        break;
    }
    setDraft(output);
    setDraftTitle(template.name);
  }

  function handleGenerateFromVoice() {
    const t = transcript.toLowerCase();
    let chosen = "ni-138-notice";
    let pseudoInputs: Record<string, string> = {};

    if (/bail|437|439/.test(t)) chosen = "bail-437";
    else if (/habeas|illegal detention|226|article 32/.test(t)) chosen = "writ-habeas";
    else if (/consumer|deficiency|product/.test(t)) chosen = "consumer-complaint";
    else if (/written statement|defendant/.test(t)) chosen = "written-statement";
    else if (/slp|supreme court|special leave/.test(t)) chosen = "slp-sc";

    const amountMatch = t.match(/(?:rs|rupees|inr)\s?\.?\s?([\d,]+)/);
    const amount = amountMatch ? amountMatch[1].replace(/,/g, "") : "";
    pseudoInputs = {
      amount,
      accusedName: extractName(t, "accused") || "",
      petitioner: extractName(t, "petitioner") || "",
      recipientName: extractName(t, "against") || "",
      grounds: transcript,
      facts: transcript,
      causeOfAction: transcript,
      defect: transcript,
      defence: transcript,
      questionOfLaw: transcript,
    };

    setTemplateId(chosen);
    setInputs((prev) => ({ ...prev, ...pseudoInputs }));

    setTimeout(() => {
      let output = "";
      const allInputs = { ...inputs, ...pseudoInputs };
      switch (chosen) {
        case "ni-138-notice":
          output = generateNi138Notice({ ...allInputs, amount });
          break;
        case "bail-437":
          output = generateBail(allInputs);
          break;
        case "writ-habeas":
          output = generateWritHabeas(allInputs);
          break;
        case "consumer-complaint":
          output = generateConsumerComplaint(allInputs);
          break;
        case "written-statement":
          output = generateWrittenStatement(allInputs);
          break;
        case "slp-sc":
          output = generateSLP(allInputs);
          break;
      }
      setDraft(output);
      setDraftTitle("Voice Draft — " + (DRAFT_TEMPLATES.find((t) => t.id === chosen)?.name || "Draft"));
    }, 50);
  }

  function handleGenerateFromFree() {
    const matched = suggestPrecedents(freeText);
    let output = generateNi138Notice({
      senderName: "[Insert]",
      recipientName: "[Insert]",
      amount: "0",
      causeOfAction: freeText,
      chequeNo: "[XXXX]",
      chequeDate: "",
      bankName: "[Bank]",
      returnDate: "",
      senderAdvocate: "[Advocate]",
      recipientAddress: "[Address]",
    });
    if (matched.length) {
      output += `\n\n=== SUGGESTED PRECEDENTS TO CITE ===\n`;
      matched.forEach((c, i) => {
        output += `[${i + 1}] ${c.name}, ${c.citation} (${c.year}) – ${c.ratio.slice(0, 220)}...\n`;
      });
    }
    setDraft(output);
    setDraftTitle("Freeform Draft (with embedded precedents)");
  }

  function toggleRecording() {
    const w = window as any;
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) {
      alert("Your browser does not support Web Speech API. Please use Chrome/Edge/Safari for voice input. You can still type in the rough notes box.");
      return;
    }
    if (recording) {
      recognitionRef.current?.stop();
      setRecording(false);
      return;
    }
    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-IN";
    rec.onresult = (e: any) => {
      let final = "";
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += t + " ";
        else interim += t;
      }
      setTranscript((existing) => existing + final);
    };
    rec.onerror = () => setRecording(false);
    rec.onend = () => setRecording(false);
    rec.start();
    recognitionRef.current = rec;
    setRecording(true);
  }

  async function copyDraft() {
    await navigator.clipboard.writeText(draft);
  }
  function downloadDraft() {
    const blob = new Blob([draft], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = (draftTitle || "draft").replace(/[^a-z0-9]+/gi, "_") + ".txt";
    a.click();
    URL.revokeObjectURL(url);
  }
  async function saveDraft() {
    setSaveStatus("saving");
    const { error } = await supabase.from("drafts").insert({
      title: draftTitle,
      type: template.name,
      content: draft,
      inputs,
      tone: "formal",
    });
    if (error) {
      console.error(error);
      setSaveStatus("idle");
      alert("Save failed: " + error.message);
      return;
    }
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 1800);
  }

  function speakDraft() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance(draft.slice(0, 1500));
    u.rate = 0.95;
    u.lang = "en-IN";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }

  useEffect(() => {
    setInputs({});
  }, [templateId]);

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-x-hidden px-4 py-6 sm:px-8 sm:py-8">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">Module 01</div>
            <h1 className="mt-1 text-2xl font-semibold text-slate-100 light:text-slate-900">AI Smart Legal Drafting Assistant</h1>
            <p className="mt-1 text-sm text-slate-400 light:text-slate-600">Generate jurisdiction-wise drafts with embedded precedent suggestions and formal-tone checking.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="chip"><ScrollText className="h-3 w-3" /> {template.forum}</span>
            <span className="chip">{template.category}</span>
          </div>
        </header>

        <div className="mb-5 flex flex-wrap gap-2 rounded-xl border border-slate-800/70 bg-slate-900/50 p-1 light:bg-white light:border-slate-200">
          <button className="tab" data-active={tab === "template"} onClick={() => setTab("template")}> 
            <FileText className="h-4 w-4" /> Template Draft
          </button>
          <button className="tab" data-active={tab === "voice"} onClick={() => setTab("voice")}> 
            <Mic className="h-4 w-4" /> Voice / Rough Notes
          </button>
          <button className="tab" data-active={tab === "freeform"} onClick={() => setTab("freeform")}> 
            <Sparkles className="h-4 w-4" /> Freeform with Precedents
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <section className="card p-5 lg:col-span-2">
            {tab === "template" && (
              <div className="space-y-4">
                <div>
                  <label className="label">Jurisdiction / Template</label>
                  <select
                    className="input"
                    value={templateId}
                    onChange={(e) => setTemplateId(e.target.value)}
                  >
                    {DRAFT_TEMPLATES.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                  <p className="mt-2 text-xs text-slate-500">{template.description}</p>
                </div>
                <div className="max-h-[52vh] space-y-3 overflow-y-auto pr-2">
                  {template.fields.map((f) => (
                    <div key={f.key}>
                      <label className="label">{f.label}</label>
                      {f.type === "textarea" ? (
                        <textarea
                          rows={3}
                          className="input font-mono text-xs"
                          placeholder={f.placeholder}
                          value={inputs[f.key] || ""}
                          onChange={(e) => setInputs({ ...inputs, [f.key]: e.target.value })}
                        />
                      ) : (
                        <input
                          type={f.type}
                          className="input"
                          placeholder={f.placeholder}
                          value={inputs[f.key] || ""}
                          onChange={(e) => setInputs({ ...inputs, [f.key]: e.target.value })}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <button className="btn-primary w-full" onClick={handleGenerate}>
                  <Sparkles className="h-4 w-4" /> Generate Draft
                </button>
              </div>
            )}

            {tab === "voice" && (
              <div className="space-y-4">
                <div>
                  <label className="label">Speak your instructions (English / हिंग्लिश)</label>
                  <div className="rounded-xl border border-slate-800/70 bg-slate-950/60 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-xs text-slate-400">
                        {recording ? "Listening… speak clearly. Click mic again to stop." : "Press the mic to start dictating."}
                      </div>
                      <button
                        onClick={toggleRecording}
                        className={
                          "flex h-12 w-12 items-center justify-center rounded-full text-white transition " +
                          (recording ? "bg-red-600 recording" : "bg-amber-600 hover:bg-amber-500")
                        }
                      >
                        {recording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="label">Or paste rough notes</label>
                  <textarea
                    rows={10}
                    className="input font-mono text-xs"
                    placeholder={'e.g. "Draft a 138 NI Act notice for Rs. 5 lakhs issued by M/s Shyam Trading Co. through Adv R.K. Mehta against M/s Apex Enterprises, cheque no 123456 dated 1/1/2024 on HDFC Bank, returned unpaid on 15/1/2024."'}
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                  />
                </div>
                <button className="btn-primary w-full" onClick={handleGenerateFromVoice}>
                  <Sparkles className="h-4 w-4" /> Auto-detect Template & Draft
                </button>
                <p className="text-xs text-slate-500">
                  Tip: Mention the statute (138 NI Act / bail u/s 437 / habeas / consumer / written statement / SLP) and amount / names / court, and we will map it to the correct template.
                </p>
              </div>
            )}

            {tab === "freeform" && (
              <div className="space-y-4">
                <div>
                  <label className="label">Freeform facts or draft paragraph</label>
                  <textarea
                    rows={18}
                    className="input font-mono text-xs leading-relaxed"
                    placeholder="Paste a raw paragraph (e.g. from a petition, statement of facts, or legal note). The assistant will convert it to formal legal tone and suggest relevant precedents inline."
                    value={freeText}
                    onChange={(e) => setFreeText(e.target.value)}
                  />
                </div>
                <button className="btn-primary w-full" onClick={handleGenerateFromFree}>
                  <Sparkles className="h-4 w-4" /> Formalise & Embed Precedents
                </button>
              </div>
            )}
          </section>

          <section className="space-y-4 lg:col-span-3">
            <div className="card p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold text-slate-200 light:text-slate-900">
                    {draftTitle || "Generated draft will appear here"}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button className="btn-ghost" onClick={handleGenerate} title="Regenerate"><RefreshCw className="h-4 w-4" /></button>
                  <button className="btn-ghost" onClick={speakDraft} title="Read aloud"><Volume2 className="h-4 w-4" /></button>
                  <button className="btn-ghost" onClick={copyDraft}><Copy className="h-4 w-4" /> Copy</button>
                  <button className="btn-ghost" onClick={downloadDraft}><Download className="h-4 w-4" /> Download</button>
                  <button className="btn-primary" onClick={saveDraft} disabled={!draft || saveStatus !== "idle"}>
                    {saveStatus === "saved" ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                    {saveStatus === "saving" ? "Saving…" : saveStatus === "saved" ? "Saved!" : "Save to Cloud"}
                  </button>
                </div>
              </div>

              <div
                ref={draftRef}
                className="max-h-[62vh] overflow-auto whitespace-pre-wrap rounded-xl border border-slate-800/70 bg-slate-950/60 p-5 font-legal text-[13px] leading-relaxed text-slate-200 light:bg-slate-50 light:text-slate-900 light:border-slate-200"
              >
                {draft || (
                  <div className="flex flex-col items-center justify-center gap-3 py-16 text-center text-slate-500">
                    <ScrollText className="h-10 w-10 text-amber-500/40" strokeWidth={1.5} />
                    <p className="text-sm">Fill in the template or use voice/rough notes to generate your first draft.</p>
                  </div>
                )}
              </div>
            </div>

            {draft && (
              <div className="card p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-200 light:text-slate-900">Legal Tone & Compliance Check</h3>
                  <div className="flex items-center gap-2">
                    <span className="chip">Tone</span>
                    <span className="chip">Compliance</span>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl border border-slate-800/70 bg-slate-950/50 p-4 text-sm text-slate-200 light:bg-white light:border-slate-200 light:text-slate-900">
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Score</div>
                    <p className="mt-2">{compliance.score}</p>
                  </div>
                  <div className="rounded-3xl border border-slate-800/70 bg-slate-950/50 p-4 text-sm text-slate-200 light:bg-white light:border-slate-200 light:text-slate-900">
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Issues</div>
                    <p className="mt-2">{compliance.issues.length > 0 ? `${compliance.issues.length} issue${compliance.issues.length !== 1 ? "s" : ""}` : "No issues detected"}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm text-slate-400 light:text-slate-600">
                  {precedents.length ? (
                    <>
                      <div className="text-slate-200 light:text-slate-900">Suggested precedents</div>
                      <ul className="list-disc space-y-1 pl-5">
                        {precedents.map((p, index) => (
                          <li key={index}>{`${p.name} — ${p.citation} (${p.year})`}</li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p>No precedent suggestions until draft text is generated.</p>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

function extractName(text: string, key: string): string | null {
  const match = text.match(new RegExp(`${key} (?:is|:|named)?\s*([A-Z][a-zA-Z ]{2,})`, "i"));
  return match?.[1]?.trim() || null;
}
