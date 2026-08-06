import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "LegalThesis.ai — Legal Drafting, Research & Exam Prep",
  description:
    "AI-powered legal drafting assistant, multi-case ratio extractor, automated Bluebook/OSCOLA citations, and smart exam prep for Indian advocates, scholars, and students.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 font-sans text-slate-200 antialiased selection:bg-amber-400/30 selection:text-amber-100">
        <ThemeProvider>
          <div className="flex min-h-screen">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
