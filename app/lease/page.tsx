// app/lease/page.tsx
"use client";
import { useMemo, useState } from "react";
import { vehicles, type City, type PickupType, type DriveMode } from "@/lib/mock";

const cities: City[] = ["Nairobi", "Mombasa", "Kisumu"];
const pickups: PickupType[] = ["SGR", "Airport", "City Center"];
const modes: DriveMode[] = ["Self-drive", "Chauffeured"];

export default function LeasePage() {
  const [city, setCity] = useState<City | "">("");
  const [pickup, setPickup] = useState<PickupType | "">("");
  const [mode, setMode] = useState<DriveMode | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const list = useMemo(() => {
    return vehicles.filter(v => {
      if (city && v.city !== city) return false;
      if (pickup && !v.pickup.includes(pickup)) return false;
      if (mode && !v.modes.includes(mode)) return false;
      const price = mode === "Chauffeured" ? v.priceChauffeured : v.priceSelf || v.priceChauffeured;
      if (maxPrice && price > Number(maxPrice)) return false;
      return true;
    });
  }, [city, pickup, mode, maxPrice]);

  return (
    <section style={{ display: "grid", gap: 16 }}>
      <h1 style={{ fontSize: 24, margin: 0 }}>Lease a vehicle</h1>
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", alignItems: "end" }}>
        <div>
          <label>City</label><br/>
          <select value={city} onChange={e => setCity(e.target.value as any)} style={{ width: "100%", padding: 8 }}>
            <option value="">Any</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label>Pickup</label><br/>
          <select value={pickup} onChange={e => setPickup(e.target.value as any)} style={{ width: "100%", padding: 8 }}>
            <option value="">Any</option>
            {pickups.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label>Drive mode</label><br/>
          <select value={mode} onChange={e => setMode(e.target.value as any)} style={{ width: "100%", padding: 8 }}>
            <option value="">Any</option>
            {modes.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label>Max daily price (KES)</label><br/>
          <input type="number" value={maxPrice as any} onChange={e => setMaxPrice(e.target.value ? Number(e.target.value) : "")} placeholder="e.g. 6000" style={{ width: "100%", padding: 8 }}/>
        </div>
      </div>

      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))" }}>
        {list.map(v => (
          <a key={v.id} href={`/lease/${v.id}`} style={{ border: "1px solid #eee", borderRadius: 12, overflow: "hidden", textDecoration: "none", color: "inherit" }}>
            <img src={v.image} alt={v.title} style={{ width: "100%", height: 160, objectFit: "cover" }}/>
            <div style={{ padding: 12 }}>
              <div style={{ fontWeight: 600 }}>{v.title}</div>
              <div style={{ color: "#666", fontSize: 14 }}>{v.city} · {v.modes.join(" / ")}</div>
              <div style={{ marginTop: 8, fontSize: 14 }}>
                {v.priceSelf ? <>Self-drive: KES {v.priceSelf.toLocaleString()}</> : <span style={{ color:"#999" }}>Self-drive N/A</span>}
                <br/>
                {v.priceChauffeured ? <>Chauffeured: KES {v.priceChauffeured.toLocaleString()}</> : <span style={{ color:"#999" }}>Chauffeured N/A</span>}
              </div>
            </div>
          </a>
        ))}
      </div>
      {!list.length && <p style={{ color:"#666" }}>No vehicles match your filters. Try widening your search.</p>}
    </section>
  );
}
