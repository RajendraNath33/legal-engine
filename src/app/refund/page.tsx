"use client";
import Sidebar from "@/components/Sidebar";

export default function RefundPage() {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-x-hidden px-4 py-6 sm:px-8 sm:py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-100 light:text-slate-900">Refund &amp; Cancellation Policy</h1>
          <p className="mt-1 text-xs text-slate-500">Effective date: 7 August 2026</p>
        </header>
        <div className="card p-6 space-y-4 text-sm text-slate-300 light:text-slate-700 leading-relaxed">
          <p>This policy applies to payments made on the Vidhi Mitra platform, operated by Divya Sewa CSC Kendra (CSC ID: 511236470017), Haldwani, Uttarakhand, India.</p>
          <div>
            <h2 className="font-semibold text-amber-400 text-base mb-1">1. Digital Service — No Refund After Generation</h2>
            <p>As Vidhi Mitra provides instant digital goods (AI-generated drafts, citations, and reports), we do not offer refunds once a document has been successfully generated and delivered, since the processing cost is incurred at that point.</p>
          </div>
          <div>
            <h2 className="font-semibold text-amber-400 text-base mb-1">2. Failed / Duplicate Transactions</h2>
            <p>If an amount is deducted from your account but the draft is not generated due to a technical error, or a payment is charged more than once for the same request, contact us with your payment reference. Verified failed/duplicate amounts are refunded to the original payment method within 5–7 working days, subject to the payment gateway's processing time.</p>
          </div>
          <div>
            <h2 className="font-semibold text-amber-400 text-base mb-1">3. Wallet Balance</h2>
            <p>Unused wallet balance is not refundable in cash but remains available for future use on the Platform, unless required otherwise by law.</p>
          </div>
          <div>
            <h2 className="font-semibold text-amber-400 text-base mb-1">4. How to Request</h2>
            <p>Email your payment reference/transaction ID and a description of the issue to the contact below. We aim to respond within 3 working days.</p>
          </div>
          <div>
            <h2 className="font-semibold text-amber-400 text-base mb-1">5. Contact for Payment Disputes</h2>
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