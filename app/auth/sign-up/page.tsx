// app/auth/sign-up/page.tsx
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [role, setRole] = useState<"TRAVELLER" | "PARTNER">("TRAVELLER");
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Sign up failed");
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
        <h1 className="text-2xl font-semibold mb-1">Create your account</h1>
        <p className="text-sm text-gray-600 mb-6">
          Already have an account?{" "}
          <Link className="link" href="/auth/signin">Sign in</Link>
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
              minLength={6}
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
            />
          </label>

          <label className="grid gap-1 text-sm">
            <span>Account type</span>
            <select
              className="input"
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
            >
              <option value="TRAVELLER">Traveller</option>
              <option value="PARTNER">Partner</option>
            </select>
          </label>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>
      </section>
    </main>
  );
}
