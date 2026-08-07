"use client";
import Sidebar from "@/components/Sidebar";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-x-hidden px-4 py-6 sm:px-8 sm:py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-100 light:text-slate-900">About Us</h1>
        </header>
        <div className="card p-6 space-y-4 text-sm text-slate-300 light:text-slate-700 leading-relaxed">
          <p>
            <strong>Vidhi Mitra</strong> is an AI-assisted legal drafting, research, citation, and exam-preparation
            platform operated by <strong>Divya Sewa CSC Kendra</strong> (CSC ID: 511236470017), based in Haldwani,
            Uttarakhand, India.
          </p>
          <p>
            Built for advocates, LLM/Ph.D. scholars, law students, judiciary/law-exam aspirants, and Common Service
            Centre (CSC) operators, the platform helps draft legal notices and applications, extract case ratios,
            generate Bluebook/OSCOLA citations, and prepare for law exams — with tools designed around Indian legal
            practice and language needs.
          </p>
          <p>
            Vidhi Mitra is an assistive drafting and information tool. It does not provide legal advice and does not
            replace a qualified advocate — see our{" "}
            <a href="/terms" className="text-amber-300 underline">Terms &amp; Conditions</a> for details.
          </p>
          <div className="pt-2 border-t border-slate-800/70 light:border-slate-200">
            <p className="text-xs text-slate-500">
              Operated by: Divya Sewa CSC Kendra · CSC ID: 511236470017 · Haldwani, Uttarakhand, India<br />
              Contact: rajenderarya340@gmail.com · +91 92589 82833
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}