// app/auth/sign-up/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"TRAVELLER" | "PARTNER" | "ADMIN">("TRAVELLER"); // keep for now
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, role }),
      });
      const json = await res.json();

      if (!res.ok || !json.ok) {
        setErr(json?.error || "Sign-up failed");
      } else {
        // API returns { redirect: "/app" | "/partner" | "/admin" }
        router.push(json.redirect || "/app");
      }
    } catch (e: any) {
      setErr(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-wrap">
      <section className="max-w-md mx-auto card p-6 md:p-8">
        <h1 className="text-2xl font-semibold mb-1">Create an account</h1>
        <p className="text-sm text-gray-600 mb-6">
          Already have an account?{" "}
          <Link className="link" href="/auth/sign-in">Sign in</Link>
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
            <span>Name (optional)</span>
            <input
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </label>

          {/* Keep role selector visible for now so we can test all portals easily. 
              We can hide this later and default to TRAVELLER. */}
          <label className="grid gap-1 text-sm">
            <span>Role (for testing)</span>
            <select
              className="input"
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
            >
              <option value="TRAVELLER">Traveller</option>
              <option value="PARTNER">Partner</option>
              <option value="ADMIN">Admin</option>
            </select>
          </label>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <div className="mt-6 text-xs text-gray-500">
          By creating an account, you agree to our terms and privacy policy.
        </div>
      </section>
    </main>
  );
}
