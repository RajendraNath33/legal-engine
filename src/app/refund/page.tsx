"use client";
import Sidebar from "@/components/Sidebar";

export default function RefundPage() {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 px-8 py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-100 light:text-slate-900">Refund & Cancellation Policy</h1>
        </header>
        <div className="card p-6 space-y-4 text-sm text-slate-300 light:text-slate-700 leading-relaxed">
          <p>As Vidhi Mitra provides instant digital goods and AI-generated drafts, we enforce a strict <strong>No Refund</strong> policy once a document has been successfully generated.</p>
          <p><strong>1. Payment for Digital Service:</strong> Payments are processed on a "pay-per-draft" or wallet recharge basis. Since the AI processing cost is incurred instantly upon generation, we cannot offer refunds for completed generations.</p>
          <p><strong>2. Failed Transactions:</strong> If a payment is deducted from your bank account but the draft is not generated due to a technical error, the amount will be automatically credited back to your original payment method within 5-7 working days by the payment gateway.</p>
          <p><strong>3. Contact Support:</strong> For any payment-related disputes, please contact our CSC helpdesk.</p>
        </div>
      </main>
    </div>
  );
}
