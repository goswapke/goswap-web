// app/layout.tsx
export const metadata = { title: "GoSwap", description: "Travel mobility marketplace" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, Arial, sans-serif", margin: 0 }}>
        <header style={{ borderBottom: "1px solid #eee" }}>
          <nav style={{ maxWidth: 1100, margin: "0 auto", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <a href="/" style={{ fontWeight: 700, textDecoration: "none", color: "#111" }}>GoSwap</a>
            <div style={{ display: "flex", gap: 12 }}>
              <a href="/lease">Lease</a>
              <a href="/swap">Swap</a>
              <a href="/auth/signin">Sign in</a>
            </div>
          </nav>
        </header>
        <main style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px" }}>{children}</main>
        <footer style={{ borderTop: "1px solid #eee", marginTop: 40 }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px", fontSize: 13, color: "#666" }}>
            © {new Date().getFullYear()} GoSwap • Nairobi • <a href="/success">Success</a> • <a href="/cancel">Cancel</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
