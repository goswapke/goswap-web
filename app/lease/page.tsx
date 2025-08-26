"use client";
import { useState } from "react";

export default function Lease() {
  const [amount, setAmount] = useState("1000");
  const [msg, setMsg] = useState<string | null>(null);

  async function pay() {
    setMsg(null);
    try {
      const res = await fetch("/api/pesapal/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(amount), description: "GoSwap Lease" })
      });
      const j = await res.json();
      if (!res.ok || !j.redirect_url) throw new Error(j.error || "Order error");
      window.location.href = j.redirect_url; // redirect to Pesapal
    } catch (e: any) {
      setMsg(e.message || "Payment failed");
    }
  }

  return (
    <div style={{ maxWidth: 520, margin: "32px auto" }}>
      <h2>Lease a vehicle</h2>
      <p style={{ color: "#555" }}>Demo: enter an amount and click Pay to open Pesapal checkout.</p>
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <input value={amount} onChange={e => setAmount(e.target.value)} style={{ flex: 1 }} />
        <button onClick={pay} style={{ padding: "10px 14px", background: "#111", color: "#fff", border: 0, borderRadius: 8 }}>
          Pay via Pesapal
        </button>
      </div>
      {msg && <div style={{ color: "crimson", marginTop: 10 }}>{msg}</div>}
    </div>
  );
}
