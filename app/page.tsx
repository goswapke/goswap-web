// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="page-wrap">
      {/* Subtle Navy Hero */}
      <section className="hero-shell p-8 md:p-12">
        <div className="hero-ring" />
        <div className="relative z-10 grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <p className="chip mb-3">New • Seamless car swaps</p>
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
              Drive your way at your destination.
            </h1>
            <p className="mt-3 text-[15px] text-gray-700">
              Browse vehicles available for swap or lease and line up the perfect match before you land.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/swap" className="btn btn-primary">Find a Swap</Link>
              <Link href="/lease" className="btn btn-secondary">Explore Lease</Link>
              <Link href="/auth/sign-up" className="btn btn-secondary">Create Account</Link>
            </div>
            <p className="mt-3 text-xs text-slate-600">
              Already a member? <Link className="link" href="/auth/sign-in">Sign in</Link>
            </p>
          </div>

          {/* Visual placeholder panel (replace with imagery when ready) */}
          <div className="card p-6 md:p-8">
            <div
              className="h-48 md:h-56 rounded-xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, hsla(226,65%,22%,.10), hsla(224,70%,28%,.10))",
                border: "1px solid hsl(var(--border))",
              }}
            >
              <span className="text-sm text-gray-600">Add promo image or map here</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs text-gray-600">
              <div className="card p-3">Nairobi</div>
              <div className="card p-3">Mombasa</div>
              <div className="card p-3">Kisumu</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features row */}
      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="card p-5">
          <h3 className="font-medium">Verified listings</h3>
          <p className="text-sm text-gray-600 mt-1">
            We aim for quality and clarity in every swap.
          </p>
        </div>
        <div className="card p-5">
          <h3 className="font-medium">Match for Swap</h3>
          <p className="text-sm text-gray-600 mt-1">
            One tap to find compatible vehicles.
          </p>
        </div>
        <div className="card p-5">
          <h3 className="font-medium">Local support</h3>
          <p className="text-sm text-gray-600 mt-1">
            Kenya-first experience across major cities.
          </p>
        </div>
      </section>
    </main>
  );
}
