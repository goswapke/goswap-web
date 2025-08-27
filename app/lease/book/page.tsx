// app/lease/book/page.tsx
"use client";
import { useMemo, useState } from "react";
import { vehicles } from "@/lib/mock";

function withinWindow(t: string) {
  // expects "HH:MM"
  const [h, m] = t.split(":").map(Number);
  const minutes = h * 60 + (m || 0);
  return minutes >= 6*60 && minutes <= 22*60; // 06:00–22:00
}

export default function BookPage({ searchParams }: { searchParams: { id?: string } }) {
  const v = useMemo(() => vehicles.find(x => x.id === searchParams.id), [searchParams.id]);
  const [mode, setMode] = useState<"Self-drive" | "Chauffeured">("Self-drive");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [arrival, setArrival] = useState("10:00");
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");

  if (!v) return <p>Missing or invalid vehicle.</p>;

  const daily = mode === "Chauffeured" ? (v.priceChauffeured || v.priceSelf) : (v.priceSelf || v.priceChauffeured);
  const days = start && end ? Math.max(1, Math.ceil((new Date(end).getTime() - new Date(start).getTime()) / (1000*60*60*24))) : 0;
  const total = daily * (days || 0);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!withinWindow(arrival)) { alert("Arrival time must be between 06:00 and 22:00"); return; }
    if (!days) { alert("Please select valid start and end dates."); return; }
    if (!name || !email) { alert("Please provide your name and email."); return; }
    // Phase 1: just simulate success
    window.location.href = `/success?ref=DEMO-${Date.now()}`;
  }

  return (
    <section style={{ display:"grid", gap:16, maxWidth: 520 }}>
      <h1 style={{ margin: 0 }}>Book: {v.title}</h1>
      <form onSubmit={submit} style={{ display:"grid", gap:12 }}>
        <label>Drive mode
          <select value={mode} onChange={e => setMode(e.target.value as any)} style={{ display: "block", width:"100%", padding:8, marginTop:6 }}>
            {v.priceSelf ? <option>Self-drive</option> : null}
            {v.priceChauffeured ? <option>Chauffeured</option> : null}
          </select>
        </label>
        <label>Start date
          <input type="date" value={start} onChange={e => setStart(e.target.value)} style={{ display: "block", width:"100%", padding:8, marginTop:6 }}/>
        </label>
        <label>End date
          <input type="date" value={end} onChange={e => setEnd(e.target.value)} style={{ display: "block", width:"100%", padding:8, marginTop:6 }}/>
        </label>
        <label>Arrival time (06:00–22:00)
          <input type="time" value={arrival} onChange={e => setArrival(e.target.value)} min="06:00" max="22:00" style={{ display: "block", width:"100%", padding:8, marginTop:6 }}/>
        </label>

        <label>Full name
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Jane Doe" style={{ display:"block", width:"100%", padding:8, marginTop:6 }}/>
        </label>
        <label>Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@example.com" style={{ display:"block", width:"100%", padding:8, marginTop:6 }}/>
        </label>
        <label>Phone
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+2547..." style={{ display:"block", width:"100%", padding:8, marginTop:6 }}/>
        </label>

        <div style={{ padding:12, background:"#fafafa", border:"1px solid #eee", borderRadius:8 }}>
          <div>Daily price: KES {daily?.toLocaleString()}</div>
          <div>Days: {days || "-"}</div>
          <div style={{ fontWeight:700 }}>Total: {days ? `KES ${total.toLocaleString()}` : "-"}</div>
        </div>

        <button type="submit" style={{ padding:"12px 14px", background:"#111", color:"#fff", borderRadius:8, border:0 }}>
          Continue to payment
        </button>
      </form>
    </section>
  );
}
