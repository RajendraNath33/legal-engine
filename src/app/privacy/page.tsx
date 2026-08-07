"use client";
import Sidebar from "@/components/Sidebar";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-x-hidden px-4 py-6 sm:px-8 sm:py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-100 light:text-slate-900">Privacy Policy</h1>
          <p className="mt-1 text-xs text-slate-500">Effective date: 7 August 2026</p>
        </header>
        <div className="card p-6 space-y-4 text-sm text-slate-300 light:text-slate-700 leading-relaxed">
          <p>This Privacy Policy applies to the Vidhi Mitra application ("the Platform"), operated by Divya Sewa CSC Kendra (CSC ID: 511236470017), Haldwani, Uttarakhand, India ("we", "us", "our").</p>
          <div>
            <h2 className="font-semibold text-amber-400 text-base mb-1">1. Information We Collect</h2>
            <p>We collect only what is needed to provide the service: the facts, names, and details you type into drafting/citation/research forms, and basic technical information (device type, app version) for troubleshooting. Voice input, where used, is processed via your browser's speech recognition and is not stored by us.</p>
          </div>
          <div>
            <h2 className="font-semibold text-amber-400 text-base mb-1">2. How We Use &amp; Store Data</h2>
            <p>Information you enter is used to generate the requested drafts, citations, and reports. If you choose to save a draft or citation, it is stored securely in our database (hosted on Supabase, an encrypted cloud database provider) so you can access it later. We do not sell your data or use it to train public AI models.</p>
          </div>
          <div>
            <h2 className="font-semibold text-amber-400 text-base mb-1">3. Your Rights (DPDP Act, 2023)</h2>
            <p>Under India's Digital Personal Data Protection Act, 2023, you have the right to access, correct, or request deletion of your personal data held by us. To exercise these rights, contact us using the details below.</p>
          </div>
          <div>
            <h2 className="font-semibold text-amber-400 text-base mb-1">4. Third-Party Services</h2>
            <p>We use secure third-party payment gateways (such as PhonePe) for processing transactions; we do not store your UPI or bank details. We use Supabase for database hosting, subject to their own security practices.</p>
          </div>
          <div>
            <h2 className="font-semibold text-amber-400 text-base mb-1">5. Data Retention</h2>
            <p>Saved drafts and citations are retained until you request deletion or close your account. Facts entered for one-off (non-saved) generation are not retained beyond your session.</p>
          </div>
          <div>
            <h2 className="font-semibold text-amber-400 text-base mb-1">6. Grievance Officer / Contact</h2>
            <p>
              Rajendra Kumar Arya (Rajendra Nath), Divya Sewa CSC Kendra (CSC ID: 511236470017)<br />
              Email: rajenderarya340@gmail.com · Phone: +91 92589 82833<br />
              Haldwani, Uttarakhand, India
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}