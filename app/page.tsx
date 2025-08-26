export default function Home() {
  return (
    <main style={{maxWidth:960,margin:"0 auto",padding:24}}>
      <h1>GoSwap</h1>
      <p>Lease or swap a car across supported Kenya corridors. Sign in to access your dashboard.</p>
      <div style={{display:"flex",gap:12,marginTop:16}}>
        <a href="/lease">Lease a car</a>
        <a href="/swap">Swap a car</a>
        <a href="/auth/sign-in">Sign in</a>
      </div>
    </main>
  );
}

