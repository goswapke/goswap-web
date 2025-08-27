import { vehicles } from "@/lib/sampleData";

export const dynamic = "force-dynamic";

export default function LeasePage() {
  const items = vehicles.filter(v => v.category === "LEASE");
  return (
    <section style={{ padding: "32px 0" }}>
      <h2 style={{ margin: "0 0 8px" }}>Lease vehicles</h2>
      <p className="muted" style={{ marginBottom: 16 }}>Filter will come later; this is demo data.</p>
      <div className="grid">
        {items.map(v => (
          <div key={v.id} className="card">
            <h3>{v.title} — {v.city}</h3>
            <div className="meta">{v.make} {v.model} • {v.year} • Pickup: {v.pickupType.replace("_"," ")}</div>
            <div className="price">
              Self-drive: KES {v.selfDrivePerDay?.toLocaleString()}/day<br/>
              Chauffeured: KES {v.chauffeuredPerDay?.toLocaleString()}/day
            </div>
            <p className="muted">{v.description}</p>
            <a href="/auth/signin" className="btn" style={{ marginTop: 8 }}>Book</a>
          </div>
        ))}
      </div>
    </section>
  );
}
