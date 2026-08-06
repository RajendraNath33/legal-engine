"use client";
import Sidebar from "@/components/Sidebar";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 px-8 py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-100 light:text-slate-900">About Us</h1>
        </header>
        <div className="card p-6 space-y-4 text-sm text-slate-300 light:text-slate-700 leading-relaxed">
          <p>Welcome to our Legal AI Assistant platform.</p>
          <p>Designed for legal professionals, NGOs, and Common Service Centres (CSCs), this platform provides AI-driven legal drafting, multi-case ratio extraction, and citation generation tailored for the Indian jurisdiction.</p>
          <p>Our mission is to democratize legal access and streamline legal document preparation through advanced and secure technology.</p>
        </div>
      </main>
    </div>
  );
}
