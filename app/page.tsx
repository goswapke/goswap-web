export default function Home() {
  return (
    <main style={{maxWidth:960,margin:"0 auto",padding:"56px 16px"}}>
      <h1 style={{fontSize:36,marginBottom:8}}>GoSwap</h1>
      <p style={{fontSize:18,opacity:.8,marginBottom:24}}>
        Lease a car at your destination or swap with someone whose vehicle fits your route—save time, money, and hassle.
      </p>
      <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
        <a href="/lease" style={{padding:"12px 18px",border:"1px solid #222",borderRadius:8,textDecoration:"none"}}>Find a car to lease</a>
        <a href="/swap" style={{padding:"12px 18px",border:"1px solid #222",borderRadius:8,textDecoration:"none"}}>List your car to swap</a>
        <a href="/auth/signup" style={{padding:"12px 18px",border:"1px solid #222",borderRadius:8,textDecoration:"none"}}>Create account</a>
      </div>
    </main>
  );
}

