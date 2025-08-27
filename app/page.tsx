// app/page.tsx
export default function Home() {
  return (
    <section style={{ display: "grid", gap: 16 }}>
      <div style={{ padding: "48px 0", textAlign: "center" }}>
        <h1 style={{ fontSize: 36, marginBottom: 8 }}>Smarter car access for your trip</h1>
        <p style={{ fontSize: 16, color: "#555", marginBottom: 24 }}>
          Lease a vehicle at destination or swap with someone whose car fits your route—cut costs, stay flexible.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <a href="/lease" style={{ padding: "12px 16px", background: "#111", color: "#fff", borderRadius: 8, textDecoration: "none" }}>Start Leasing</a>
          <a href="/swap" style={{ padding: "12px 16px", background: "#f3f3f3", color: "#111", borderRadius: 8, textDecoration: "none" }}>List a Swap</a>
        </div>
      </div>
      <div style={{ display: "grid", gap: 8, textAlign: "center", color: "#666" }}>
        <span>Active cities: Nairobi • Mombasa • Kisumu</span>
        <span>Pickup: SGR • Airport • City Center · Modes: Self-drive or Chauffeured</span>
      </div>
    </section>
  );
}



