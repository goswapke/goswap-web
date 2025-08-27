// app/swap/page.tsx
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import Link from "next/link";
import prisma from "@/lib/prisma";

async function ensureSeed() {
  if (process.env.AUTO_SEED !== "true") return;
  const count = await prisma.vehicle.count({ where: { listingType: "SWAP" } });
  if (count > 0) return;

  const vehicles = [
    { make:"Toyota", model:"RAV4", year:2019, fuelType:"Petrol", transmission:"Automatic", locationCity:"Nairobi", imageUrl:"https://images.unsplash.com/photo-1619767886558-efdc259cde1a", description:"Clean SUV, ideal for city and weekend trips.", listingType:"SWAP" as const },
    { make:"Mazda", model:"CX-5", year:2020, fuelType:"Petrol", transmission:"Automatic", locationCity:"Mombasa", imageUrl:"https://images.unsplash.com/photo-1549921296-3b4a3d4b8b36", description:"Comfortable coastal cruiser, well maintained.", listingType:"SWAP" as const },
    { make:"Subaru", model:"Forester", year:2018, fuelType:"Petrol", transmission:"Automatic", locationCity:"Kisumu", imageUrl:"https://images.unsplash.com/photo-1583121274602-3e2820f36e55", description:"All-wheel drive, great for trips around the lake.", listingType:"SWAP" as const },
    { make:"Nissan", model:"X-Trail", year:2017, fuelType:"Diesel", transmission:"Automatic", locationCity:"Nairobi", imageUrl:"https://images.unsplash.com/photo-1605559424843-9e4f1a5b4f9c", description:"Spacious family SUV with good ground clearance.", listingType:"SWAP" as const },
    { make:"Honda", model:"CR-V", year:2019, fuelType:"Petrol", transmission:"Automatic", locationCity:"Mombasa", imageUrl:"https://images.unsplash.com/photo-1503376780353-7e6692767b70", description:"Reliable and efficient; perfect for coastal drives.", listingType:"SWAP" as const },
  ];

  for (const v of vehicles) {
    const id = `${v.make}_${v.model}_${v.year}_${v.locationCity}`.toLowerCase().replace(/\s+/g, "-");
    await prisma.vehicle.upsert({ where: { id }, update: v, create: { ...v, id } });
  }
}

export default async function SwapPage() {
  await ensureSeed(); // seeds once if empty and AUTO_SEED=true

  const swapVehicles = await prisma.vehicle.findMany({
    where: { listingType: "SWAP" },
    orderBy: { createdAt: "desc" },
  });

  if (swapVehicles.length === 0) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl md:text-3xl font-semibold mb-3">Swap Vehicles</h1>
        <p className="text-gray-600">No vehicles yet. Try seeding, then reload this page.</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold">Swap Vehicles</h1>
        <p className="text-sm text-gray-500">Browse all vehicles available for swap.</p>
      </header>

      <section aria-label="Vehicles available for swap">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {swapVehicles.map((v) => (
            <article key={v.id} className="rounded-2xl border border-gray-200/40 bg-white/90 shadow-sm p-4">
              {v.imageUrl && (
                <img src={v.imageUrl} alt={`${v.make} ${v.model}`} className="w-full h-40 object-cover rounded-xl mb-3" />
              )}
              <h2 className="text-lg font-medium">{v.year} {v.make} {v.model}</h2>
              <p className="text-sm text-gray-600">{v.locationCity}</p>
              {v.description && <p className="text-sm text-gray-500 mt-1">{v.description}</p>}
            </article>
          ))}
        </div>
      </section>

      <div className="mt-8 flex justify-center">
        <Link href="/swap/match" className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-base font-medium border border-gray-300 hover:border-gray-400 transition shadow-sm">
          Match for Swap
        </Link>
      </div>
    </main>
  );
}
