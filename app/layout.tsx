import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GoSwap",
  description: "Swap or lease vehicles with trusted partners.",
};

function DeployBanner() {
  const sha = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || "local";
  const ref = process.env.VERCEL_GIT_COMMIT_REF || "dev";
  return (
    <div style={{background:"hsl(214,60%,22%)",color:"#fff",padding:"6px 12px",fontSize:12,textAlign:"center"}}>
      ✅ Deployed • {ref}@{sha}
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <DeployBanner />
        <header className="sticky top-0 z-30 backdrop-blur bg-white/80 border-b border-[--border]">
          <div className="container">
            <div className="flex items-center justify-between py-3">
              <a href="/" className="font-semibold tracking-tight text-slate-900">GoSwap</a>
              <nav className="flex items-center gap-3 text-sm">
                <a href="/swap" className="link">Swap</a>
                <a href="/lease" className="link">Lease</a>
                <a href="/auth/sign-in" className="btn btn-secondary">Sign in</a>
                <a href="/auth/sign-up" className="btn btn-primary">Create account</a>
              </nav>
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[--border] bg-white">
          <div className="container py-10 text-sm text-slate-600">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <p>© {new Date().getFullYear()} GoSwap. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <a className="link" href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
                <a className="link" href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
                <a className="link" href="https://wa.me/254700000000" target="_blank" rel="noreferrer">WhatsApp</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
