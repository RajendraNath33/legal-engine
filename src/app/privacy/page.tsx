"use client";
import Sidebar from "@/components/Sidebar";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 px-8 py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-100 light:text-slate-900">Privacy Policy</h1>
        </header>
        <div className="card p-6 space-y-4 text-sm text-slate-300 light:text-slate-700 leading-relaxed">
          <p>This Privacy Policy applies to the Vidhi Mitra application operated by Divya Seva CSC Kendra.</p>
          <p><strong>1. Information Collection:</strong> We do not ask for unnecessary personal data. For drafting purposes, the information you enter is processed temporarily.</p>
          <p><strong>2. Data Usage & Storage:</strong> The legal facts and inputs provided are strictly used to generate the requested documents via AI. We do not permanently store sensitive client details on our servers, nor do we use your data to train public AI models.</p>
          <p><strong>3. Third-Party Services:</strong> We use secure third-party payment gateways (like PhonePe) for processing transactions. We do not store your UPI or bank details.</p>
        </div>
      </main>
    </div>
  );
}
