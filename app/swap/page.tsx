// app/swap/page.tsx
export const runtime = "nodejs";
export const revalidate = 0;
export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";

type CardVehicle = {
  id: string;
  make: string;
  model: string;
  year: number;
  locationCity: string;
  imageUrl: string | null;
};

export default async function SwapPage() {
  let vehicles: CardVehicle[] = [];
  try {
    vehicles = await prisma.vehicle.findMany({
      where: { listingType: "SWAP", status: "APPROVED" },
      orderBy: { createdAt: "desc" },
      take: 60,
      select: {
        id: true,
        make: true,
        model: true,
        year: true,
        locationCity: true,
        imageUrl: true,
      },
    });
  } catch (e) {
    // If DB is unreachable, keep the page functional with an empty list
    vehicles = [];
  }

  return (
    <main className="page-wrap">
      <h1 className="section-title">Vehicles available for Swap</h1>
      <p className="section-subtle">
        Browse currently available swap vehicles. Start a match and we’ll help you connect with partners.
      </p>

      {vehicles.length > 0 ? (
        <>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {vehicles.map((v) => (
              <div key={v.id} className="card overflow-hidden">
                <div className="w-full h-40 bg-slate-100">
                  {/* use plain <img> to avoid extra Next setup */}
                  <img
                    src={
                      v.imageUrl ||
                      "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1200&auto=format&fit=crop"
                    }
                    alt={`${v.year} ${v.make} ${v.model}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <div className="text-base font-medium">
                    {v.year} {v.make} {v.model}
                  </div>
                  <div className="text-sm text-slate-600 mt-1">{v.locationCity}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Button BELOW the list */}
          <div className="mt-10 flex justify-center">
            <a href="/swap/match" className="btn-primary">Match for Swap</a>
          </div>
        </>
      ) : (
        // Empty state (still shows the button)
        <div className="card p-8 mt-6 text-center">
          <h3 className="text-lg font-medium">No swap vehicles yet</h3>
          <p className="text-slate-600 mt-2">
            We’re onboarding partners and adding inventory. You can still start a match now.
          </p>
          <div className="mt-6">
            <a href="/swap/match" className="btn-primary">Match for Swap</a>
          </div>
        </div>
      )}
    </main>
  );
}
