export default function Home() {
  return (
    <main style={{maxWidth: 960, margin: "0 auto", padding: 24}}>
      <h1>GoSwap</h1>
      <p>Lease a vehicle or swap cars. Marketplace model — partners list cars, travelers book; swappers list and match.</p>
      <nav style={{display:"flex", gap:12, marginTop:16}}>
        <a href="/auth/register">Create account</a>
        <a href="/auth/sign-in">Sign in</a>
        <a href="/lease">Lease</a>
        <a href="/swap">Swap</a>
      </nav>
    </main>
  );
}
