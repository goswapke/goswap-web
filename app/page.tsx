export default function Home() {
  return (
    <section className="py-16">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold">Freedom to move, anywhere</h1>
        <p className="mt-3 text-slate-600">
          GoSwap lets travelers lease a car from trusted partners or swap vehicles with matching travelers—reducing hassle, fatigue, and cost.
        </p>
        <div className="mt-8 flex gap-3">
          <a href="/lease" className="rounded-lg px-5 py-3 border bg-black text-white">Find a car to lease</a>
          <a href="/swap" className="rounded-lg px-5 py-3 border">Explore swaps</a>
        </div>
      </div>
    </section>
  );
}


