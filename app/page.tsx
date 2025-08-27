export default function Home() {
  return (
    <section className="hero">
      <h1>Freedom to move, anywhere</h1>
      <p>GoSwap lets travelers lease a car from trusted partners or swap vehicles with matching travelers—reducing hassle, fatigue, and cost while staying flexible.</p>
      <div style={{ display: "flex", gap: 12 }}>
        <a href="/lease" className="btn btn-primary">Find a car to lease</a>
        <a href="/swap" className="btn btn-outline">Explore swaps</a>
      </div>
    </section>
  );
}



