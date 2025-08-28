// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";

type User = { id: string; email: string; role: string; createdAt?: string };
type Vehicle = {
  id: string;
  make: string;
  model: string;
  year: number;
  locationCity: string;
  listingType: string;
  createdAt?: string;
};

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/summary", { cache: "no-store" });
        if (res.status === 401) {
          // Not an admin or not signed in → go to sign-in, then return here
          window.location.href = "/auth/sign-in?next=/admin";
          return;
        }
        const json = await res.json();
        if (!json.ok) throw new Error(json.error || "Failed");
        setUsers(json.users || []);
        setVehicles(json.vehicles || []);
      } catch (e: any) {
        setErr(e?.message || "Failed to load admin data");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className="page-wrap">
      <h1 className="section-title">Admin</h1>
      <p className="section-subtle mb-6">Overview of users and vehicles (private, admin-only).</p>

      {loading && <p>Loading…</p>}
      {err && <p className="text-red-600">Error: {err}</p>}

      {!loading && !err && (
        <>
          <section className="mb-10">
            <h2 className="text-xl font-medium mb-3">Users</h2>
            <div className="card p-0 overflow-x-auto">
              {users.length === 0 ? (
                <div className="p-4 text-sm text-gray-600">No users yet.</div>
              ) : (
                <table className="min-w-full text-sm">
                  <thead className="bg-white">
                    <tr>
                      <th className="text-left p-3">Email</th>
                      <th className="text-left p-3">Role</th>
                      <th className="text-left p-3">ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-t" style={{ borderColor: "hsl(var(--border))" }}>
                        <td className="p-3">{u.email}</td>
                        <td className="p-3">{u.role}</td>
                        <td className="p-3">{u.id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-3">Vehicles</h2>
            <div className="card p-0 overflow-x-auto">
              {vehicles.length === 0 ? (
                <div className="p-4 text-sm text-gray-600">No vehicles yet.</div>
              ) : (
                <table className="min-w-full text-sm">
                  <thead className="bg-white">
                    <tr>
                      <th className="text-left p-3">Year</th>
                      <th className="text-left p-3">Make</th>
                      <th className="text-left p-3">Model</th>
                      <th className="text-left p-3">City</th>
                      <th className="text-left p-3">Type</th>
                      <th className="text-left p-3">ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles.map((v) => (
                      <tr key={v.id} className="border-t" style={{ borderColor: "hsl(var(--border))" }}>
                        <td className="p-3">{v.year}</td>
                        <td className="p-3">{v.make}</td>
                        <td className="p-3">{v.model}</td>
                        <td className="p-3">{v.locationCity}</td>
                        <td className="p-3">{v.listingType}</td>
                        <td className="p-3">{v.id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
