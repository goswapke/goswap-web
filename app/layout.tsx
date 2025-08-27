export const metadata = { title: "GoSwap", description: "Lease or swap cars across Kenya" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        <header className="border-b">
          <nav className="mx-auto max-w-6xl flex items-center justify-between p-4">
            <a href="/" className="font-bold text-lg">GoSwap</a>
            <div className="flex items-center gap-4 text-sm">
              <a href="/lease" className="hover:underline">Lease</a>
              <a href="/swap" className="hover:underline">Swap</a>
              <a href="/auth/signin" className="hover:underline">Sign in</a>
              <a href="/auth/signup" className="rounded px-3 py-1 border hover:bg-slate-50">Create account</a>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl p-6">{children}</main>
        <footer className="mt-16 border-t">
          <div className="mx-auto max-w-6xl p-6 text-xs text-slate-500">
            © {new Date().getFullYear()} GoSwap • Travel mobility marketplace
          </div>
        </footer>
      </body>
    </html>
  );
}
