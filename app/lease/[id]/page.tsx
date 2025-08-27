// app/lease/[id]/page.tsx
import { vehicles } from "@/lib/mock";

export default function VehicleDetail({ params }: { params: { id: string } }) {
  const v = vehicles.find(x => x.id === params.id);
  if (!v) return <p>Vehicle not found.</p>;
  return (
    <article style={{ display: "grid", gap: 16 }}>
      <img src={v.image} alt={v.title} style={{ width: "100%", maxHeight: 360, objectFit: "cover", borderRadius: 12 }}/>
      <h1 style={{ margin: 0 }}>{v.title}</h1>
      <p style={{ color:"#666" }}>{v.make} • {v.model} • {v.year} • {v.city}</p>
      <p>{v.description}</p>
      <div style={{ display: "grid", gap: 8, maxWidth: 420 }}>
        <div>Self-drive: {v.priceSelf ? `KES ${v.priceSelf.toLocaleString()}/day` : "N/A"}</div>
        <div>Chauffeured: {v.priceChauffeured ? `KES ${v.priceChauffeured.toLocaleString()}/day` : "N/A"}</div>
        <a href={`/lease/book?id=${v.id}`} style={{ marginTop: 8, padding: "12px 14px", background: "#111", color:"#fff", borderRadius: 8, textDecoration: "none", textAlign: "center" }}>
          Book this vehicle
        </a>
      </div>
    </article>
  );
}
