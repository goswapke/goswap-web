export default function Home() {
  return (
    <section style={{ textAlign: "center", padding: "64px 0" }}>
      <h1 style={{ fontSize: 44, lineHeight: 1.1, marginBottom: 12 }}>Lease or Swap a Car with Ease</h1>
      <p style={{ color: "#555", maxWidth: 720, margin: "0 auto 28px" }}>
        GoSwap lets travelers lease a car at their destination or match a car swap across Kenyan corridors. Simple, transparent, and flexible.
      </p>
      <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
        <a href="/lease" style={{ padding: "12px 18px", background: "#111", color: "#fff", textDecoration: "none", borderRadius: 8 }}>Start Leasing</a>
        <a href="/swap" style={{ padding: "12px 18px", border: "1px solid #111", color: "#111", textDecoration: "none", borderRadius: 8 }}>List a Swap</a>
      </div>
    </section>
  );
}
