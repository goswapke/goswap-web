import "./globals.css";

export const metadata = {
  title: "GoSwap",
  description: "Lease or swap cars across Kenya",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <div className="container nav">
            <a href="/" style={{ fontWeight: 700 }}>GoSwap</a>
            <nav>
              <a href="/lease">Lease</a>
              <a href="/swap">Swap</a>
              <a href="/auth/signin">Sign in</a>
              <a href="/auth/signup" className="btn btn-outline" style={{ marginLeft: 8 }}>Create account</a>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="footer">
          <div className="container">© {new Date().getFullYear()} GoSwap • Travel mobility marketplace</div>
        </footer>
      </body>
    </html>
  );
}

  
