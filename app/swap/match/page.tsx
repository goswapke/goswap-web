// app/swap/match/page.tsx
export const runtime = "nodejs";

export default function MatchForSwapPage() {
  return (
    <main className="page-wrap">
      <h1 className="section-title">Match for Swap</h1>
      <p className="section-subtle">
        Sign in to start a swap request. We’ll notify suitable partners and get back to you.
      </p>

      <div className="card p-6 mt-6">
        <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700">
          <li>Create or sign into your GoSwap account.</li>
          <li>Tell us your travel dates, pickup city, and preferred vehicle type.</li>
          <li>We’ll propose matches from approved partners.</li>
        </ol>

        <div className="mt-6 flex gap-3">
          <a href="/auth/sign-in" className="btn-secondary">Sign in</a>
          <a href="/auth/sign-up" className="btn-primary">Create account</a>
        </div>
      </div>
    </main>
  );
}
