// app/layout.tsx
import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  title: "GoSwap",
  description: "Drive your way at your destination.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-[hsl(var(--background))] text-[hsl(var(--foreground))] antialiased">
        <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/30 border-b border-[hsl(var(--border))]">
          <div className="page-wrap py-3">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center gap-2">
                {/* Replace with your real logo when ready */}
                <Image src="/logo.svg" alt="GoSwap" width={24} height={24} />
                <span className="font-semibold tracking-tight">GoSwap</span>
              </a>
              <nav className="hidden sm:flex items-center gap-4">
                <a href="/" className="text-sm text-gray-300 hover:text-white">Home</a>
                <a href="/swap" className="text-sm text-gray-300 hover:text-white">Swap</a>
                <a href="/lease" className="text-sm text-gray-300 hover:text-white">Lease</a>
              </nav>
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer className="mt-16 border-t border-[hsl(var(--border))]">
          <div className="page-wrap py-8 text-sm text-gray-400">
            © {new Date().getFullYear()} GoSwap — Drive your way at your destination.
          </div>
        </footer>
      </body>
    </html>
  );
}
