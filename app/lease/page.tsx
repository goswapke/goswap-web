import { vehicles } from "@/lib/sampleData";

export const dynamic = "force-dynamic";

export default async function LeasePage() {
  const items = vehicles.filter(v => v.category === "LEASE");

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">Lease vehicles</h1>
      <p className="text-sm text-slate-600 mb-6">Filter by city and pickup at checkout (demo data for now).</p>
      <div className="grid md:grid-cols-3 gap-4">
        {items.map(v => (
          <div key={v.id} className="border rounded-lg p-4">
            <div className="font-medium">{v.title} — {v.city}</div>
            <div className="text-xs text-slate-600">{v.make} {v.model} • {v.year} • Pickup: {v.pickupType.replace("_"," ")}</div>
            <div className="mt-2 text-sm">
              Self-drive: KES {v.selfDrivePerDay?.toLocaleString()}/day<br/>
              Chauffeured: KES {v.chauffeuredPerDay?.toLocaleString()}/day
            </div>
            <p className="mt-2 text-sm text-slate-700">{v.description}</p>
            <a href="/auth/signin" className="mt-3 inline-block text-sm rounded px-3 py-1 border">Book</a>
          </div>
        ))}
      </div>
    </section>
  );
}
