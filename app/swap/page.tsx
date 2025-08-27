// app/swap/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic"; // always fetch fresh data

export default async function SwapPage() {
  const swapVehicles = await prisma.vehicle.findMany({
    where: { listingType: "SWAP" },
    orderBy: { createdAt: "desc" },
  });

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
                <img
                  src={v.imageUrl}
                  alt={`${v.make} ${v.model}`}
                  className="w-full h-40 object-cover rounded-xl mb-3"
                />
              )}
              <h2 className="text-lg font-medium">
                {v.year} {v.make} {v.model}
              </h2>
              <p className="text-sm text-gray-600">{v.locationCity}</p>
              {v.description && <p className="text-sm text-gray-500 mt-1">{v.description}</p>}
            </article>
          ))}
        </div>
      </section>

      <div className="mt-8 flex justify-center">
        <Link
          href="/swap/match"
          className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-base font-medium border border-gray-300 hover:border-gray-400 transition shadow-sm"
        >
          Match for Swap
        </Link>
      </div>
    </main>
  );
}
