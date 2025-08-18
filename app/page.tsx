import Link from "next/link";
export default function Home(){
  return (<div style={{textAlign:"center"}}>
    <h1>GoSwap</h1>
    <p>Kenya-first marketplace to lease or swap vehicles.</p>
    <p><Link href="/auth/signin">Sign in</Link> · <Link href="/auth/signup">Sign up</Link></p>
  </div>);
}
