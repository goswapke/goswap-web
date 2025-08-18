"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignIn(){
  const [email,setEmail]=useState(""), [password,setPassword]=useState("");
  const submit=async(e:React.FormEvent)=>{e.preventDefault(); await signIn("credentials",{ email, password, callbackUrl:"/" });};
  return (<div style={{maxWidth:360,margin:"40px auto"}}>
    <h2>Sign in</h2>
    <form onSubmit={submit} style={{display:"grid",gap:8}}>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button>Continue</button>
    </form>
    <p style={{marginTop:8}}>No account? <Link href="/auth/signup">Create one</Link></p>
  </div>);
}
