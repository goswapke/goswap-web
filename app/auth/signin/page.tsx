// app/auth/sign-in/page.tsx
"use client";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null); const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setErr(null);
    const res = await fetch("/api/auth/sign-in", { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }) });
    const json = await res.json();
    setLoading(false);
    if (!json.ok) return setErr(json.error || "Failed");
    window.location.href = json.redirect || "/app";
  };

  return (
    <main className="page-wrap">
      <div className="max-w-md mx-auto card p-6 bg-white">
        <h1 className="text-xl font-semibold">Sign in</h1>
        <p className="text-sm text-gray-600 mt-1">Access your portal.</p>
        <form onSubmit={submit} className="mt-4 grid gap-3">
          <input className="w-full rounded-xl border px-3 py-2" placeholder="Email"
                 value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <input className="w-full rounded-xl border px-3 py-2" type="password" placeholder="Password"
                 value={password} onChange={(e)=>setPassword(e.target.value)} required />
          {err && <p className="text-sm text-red-600">{err}</p>}
          <button className="btn-primary" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
        </form>
        <p className="text-sm text-gray-600 mt-3">
          New here? <a className="text-[hsl(var(--brand))]" href="/auth/sign-up">Create an account</a>
        </p>
      </div>
    </main>
  );
}
