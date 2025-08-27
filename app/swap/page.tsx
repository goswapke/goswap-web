// app/swap/page.tsx
"use client";
import { useState } from "react";
import type { City } from "@/lib/mock";

const cities: City[] = ["Nairobi", "Mombasa", "Kisumu"];

export default function SwapPage() {
  const [tab, setTab] = useState<"list"|"match">("list");

  return (
    <section style={{ display:"grid", gap:16, maxWidth: 640 }}>
      <h1 style={{ margin:0 }}>Swap a vehicle</h1>
      <div style={{ display:"flex", gap:8 }}>
        <button onClick={() => setTab("list")} style={{ padding:"8px 10px", borderRadius:8, border:"1px solid #ddd", background: tab==="list" ? "#111" : "#fff", color: tab==="list" ? "#fff" : "#111" }}>List my vehicle</button>
        <button onClick={() => setTab("match")} style={{ padding:"8px 10px", borderRadius:8, border:"1px solid #ddd", background: tab==="match" ? "#111" : "#fff", color: tab==="match" ? "#fff" : "#111" }}>Find a match</button>
      </div>

      {tab==="list" ? <ListForm/> : <MatchForm/>}
      <p style={{ color:"#666", fontSize:13 }}>
        Contacts are exchanged only after fee payment. Plates stay hidden on the public listing.
      </p>
    </section>
  );
}

function ListForm() {
  const [photos, setPhotos] = useState<FileList | null>(null);
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!photos || photos.length < 5) { alert("Please upload at least 5 photos (include logbook & one plate photo)."); return; }
    window.location.href = "/success?ref=SWAP-LISTED";
  }
  return (
    <form onSubmit={submit} style={{ display:"grid", gap:12 }}>
      <label>Full name <input required placeholder="Your name" style={{ display:"block", width:"100%", padding:8, marginTop:6 }}/></label>
      <label>Email <input required type="email" placeholder="you@example.com" style={{ display:"block", width:"100%", padding:8, marginTop:6 }}/></label>
      <label>Phone <input required placeholder="+2547..." style={{ display:"block", width:"100%", padding:8, marginTop:6 }}/></label>

      <div style={{ display:"grid", gap:8, gridTemplateColumns:"repeat(auto-fit, minmax(180px,1fr))" }}>
        <label>Make <input required placeholder="e.g. Toyota" style={{ width:"100%", padding:8, marginTop:6 }}/></label>
        <label>Model <input required placeholder="e.g. Axio" style={{ width:"100%", padding:8, marginTop:6 }}/></label>
        <label>Year <input required type="number" placeholder="2017" style={{ width:"100%", padding:8, marginTop:6 }}/></label>
      </div>

      <div style={{ display:"grid", gap:8, gridTemplateColumns:"repeat(auto-fit, minmax(180px,1fr))" }}>
        <label>Your city
          <select required style={{ width:"100%", padding:8, marginTop:6 }}>
            {cities.map(c => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label>Preferred swap city
          <select required style={{ width:"100%", padding:8, marginTop:6 }}>
            {cities.map(c => <option key={c}>{c}</option>)}
          </select>
        </label>
      </div>

      <label>Upload photos (min 5 incl. logbook & plate)
        <input required type="file" multiple accept="image/*" onChange={e => setPhotos(e.target.files)} style={{ display:"block", marginTop:6 }}/>
      </label>

      <button type="submit" style={{ padding:"12px 14px", background:"#111", color:"#fff", borderRadius:8, border:0 }}>
        Pay listing fee & publish
      </button>
    </form>
  );
}

function MatchForm() {
  function submit(e: React.FormEvent) {
    e.preventDefault();
    window.location.href = "/success?ref=SWAP-MATCH";
  }
  return (
    <form onSubmit={submit} style={{ display:"grid", gap:12 }}>
      <label>Full name <input required placeholder="Your name" style={{ display:"block", width:"100%", padding:8, marginTop:6 }}/></label>
      <label>Email <input required type="email" placeholder="you@example.com" style={{ display:"block", width:"100%", padding:8, marginTop:6 }}/></label>
      <label>Phone <input required placeholder="+2547..." style={{ display:"block", width:"100%", padding:8, marginTop:6 }}/></label>
      <label>City you can swap from
        <select required style={{ width:"100%", padding:8, marginTop:6 }}>
          {cities.map(c => <option key={c}>{c}</option>)}
        </select>
      </label>
      <button type="submit" style={{ padding:"12px 14px", background:"#111", color:"#fff", borderRadius:8, border:0 }}>
        Pay match fee & get contacts
      </button>
    </form>
  );
}
