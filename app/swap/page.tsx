import { vehicles } from "@/lib/sampleData";

export const dynamic = "force-dynamic";

export default function SwapPage() {
  const items = vehicles.filter(v => v.category === "SWAP");
  return (
    <section style={{ padding: "32px 0" }}>
      <h2 style={{ margin: "0 0 8px" }}>Swap vehicles</h2>
      <p className="muted" style={{ marginBottom: 16 }}>Contacts & plates are masked until both parties pay the swap fee (demo view).</p>
      <div className="grid">
        {items.map(v => (
          <div key={v.id} className="card">
            <h3>{v.title} — {v.city}</h3>
            <div className="meta">{v.make} {v.model} • {v.year} • Pickup: {v.pickupType.replace("_"," ")}</div>
            <div className="price">Plate: {v.plateMasked ?? "K** ***"}</div>
            <p className="muted">{v.description}</p>
            <a href="/auth/signin" className="btn" style={{ marginTop: 8 }}>Match</a>
          </div>
        ))}
      </div>
    </section>
  );
}
