// app/auth/sign-in/page.tsx
"use client";

import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Sign-in failed");
      window.location.assign(json.redirect || "/");
    } catch (e: any) {
      setErr(e?.message || "Sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-wrap">
      <h1 className="section-title">Sign in</h1>
      <p className="section-subtle">Access your portal to continue.</p>

      <form onSubmit={onSubmit} className="card p-6 mt-6 grid gap-4 max-w-md">
        {err && <div className="text-red-600 text-sm">{err}</div>}
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
            placeholder="••••••••"
          />
        </label>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <div className="text-sm text-slate-600">
          No account?{" "}
          <a className="link" href="/auth/sign-up">Create one</a>
        </div>
      </form>
    </main>
  );
}
