// app/auth/sign-up/page.tsx
"use client";

import { useState } from "react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Sign-up failed");
      window.location.assign(json.redirect || "/app");
    } catch (e: any) {
      setErr(e?.message || "Sign-up failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-wrap">
      <h1 className="section-title">Create account</h1>
      <p className="section-subtle">Join GoSwap to book, swap, or manage vehicles.</p>

      <form onSubmit={onSubmit} className="card p-6 mt-6 grid gap-4 max-w-md">
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <label className="grid gap-1 text-sm">
          <span>Name</span>
          <input
            className="border rounded-xl px-3 py-2"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </label>

        <label className="grid gap-1 text-sm">
          <span>Email</span>
          <input
            className="border rounded-xl px-3 py-2"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </label>

        <label className="grid gap-1 text-sm">
          <span>Password</span>
          <input
            className="border rounded-xl px-3 py-2"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
          />
        </label>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Creating…" : "Create account"}
        </button>

        <div className="text-sm text-slate-600">
          Already have an account?{" "}
          <a className="link" href="/auth/sign-in">Sign in</a>
        </div>
      </form>
    </main>
  );
}
