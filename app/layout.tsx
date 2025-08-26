export const metadata = { title: "GoSwap", description: "Travel mobility marketplace" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderBottom: "1px solid #eee" }}>
          <a href="/" style={{ fontWeight: 700, textDecoration: "none", color: "#111" }}>GoSwap</a>
          <nav style={{ display: "flex", gap: 14 }}>
            <a href="/lease">Lease</a>
            <a href="/swap">Swap</a>
            <a href="/auth/sign-in">Sign in</a>
            <a href="/auth/register" style={{ fontWeight: 600 }}>Create account</a>
          </nav>
        </header>
        <main style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>{children}</main>
        <footer style={{ borderTop: "1px solid #eee", marginTop: 40, padding: 16, fontSize: 12, color: "#666" }}>
          © {new Date().getFullYear()} GoSwap
        </footer>
      </body>
    </html>
  );
}


