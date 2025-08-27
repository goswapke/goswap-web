// app/admin/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

import prisma from "@/lib/prisma";

export default async function AdminPage() {
  try {
    // Minimal, safe queries (adjust as you wish)
    const [users, vehicles] = await Promise.all([
      prisma.user.findMany({ select: { id: true, email: true, role: true }, orderBy: { createdAt: "desc" } }),
      prisma.vehicle.findMany({ select: { id: true, make: true, model: true, year: true, locationCity: true, listingType: true }, orderBy: { createdAt: "desc" } }),
    ]);

    return (
      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">Admin</h1>

        <section className="mb-10">
          <h2 className="text-xl font-medium mb-3">Users</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Role</th>
                  <th className="text-left p-3">ID</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-t">
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">{u.role}</td>
                    <td className="p-3">{u.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-3">Vehicles</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
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
                {vehicles.map(v => (
                  <tr key={v.id} className="border-t">
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
          </div>
        </section>
      </main>
    );
  } catch (err) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">Admin</h1>
        <p className="text-red-600">
          Failed to load admin data. This page is dynamic and requires database access.
        </p>
      </main>
    );
  }
}
