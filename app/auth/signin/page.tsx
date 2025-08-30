// app/auth/signin/page.tsx
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Sign in failed");
      router.push(json.redirect || "/app");
    } catch (e: any) {
      setErr(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-wrap">
      <section className="max-w-md mx-auto card p-6 md:p-8">
        <h1 className="text-2xl font-semibold mb-1">Sign in</h1>
        <p className="text-sm text-gray-600 mb-6">
          New here?{" "}
          <Link className="link" href="/auth/sign-up">Create an account</Link>
        </p>

        {err && <div className="mb-4 text-sm text-red-600">{err}</div>}

        <form onSubmit={onSubmit} className="grid gap-4">
          <label className="grid gap-1 text-sm">
            <span>Email</span>
            <input
              type="email"
              required
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label className="grid gap-1 text-sm">
            <span>Password</span>
            <input
              type="password"
              required
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
            />
          </label>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}
