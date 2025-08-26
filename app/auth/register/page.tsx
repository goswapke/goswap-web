"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const r = useRouter();
  const [form, set] = useState({ name: "", email: "", phone: "", password: "" });
  const [msg, setMsg] = useState<string | null>(null);
  const onChange = (e: any) => set({ ...form, [e.target.name]: e.target.value });

  async function submit(e: any) {
    e.preventDefault();
    setMsg(null);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const j = await res.json();
    if (!res.ok) return setMsg(j.error || "Failed");
    r.push("/success");
  }

  return (
    <div style={{ maxWidth: 460, margin: "32px auto" }}>
      <h2>Create your account</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 10, marginTop: 12 }}>
        <input name="name" placeholder="Full name" value={form.name} onChange={onChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={onChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required />
        <button type="submit" style={{ padding: "10px 14px", background: "#111", color: "#fff", border: 0, borderRadius: 8 }}>Create account</button>
        {msg && <div style={{ color: "crimson" }}>{msg}</div>}
      </form>
    </div>
  );
}
