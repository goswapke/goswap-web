"use client";
import { useState } from "react";

export default function SignUpPage() {
  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const [err,setErr]=useState<string|null>(null); const [loading,setLoading]=useState(false);

  async function onSubmit(e:React.FormEvent){
    e.preventDefault(); setErr(null); setLoading(true);
    try{
      const res=await fetch("/api/auth/sign-up",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({name,email,password})});
      const json=await res.json();
      if(!res.ok||!json.ok) throw new Error(json.error||"Sign-up failed");
      window.location.assign(json.redirect||"/");
    }catch(e:any){ setErr(e?.message||"Sign-up failed"); } finally{ setLoading(false); }
  }

  return (
    <main className="page-wrap">
      <h1 className="section-title">Create account</h1>
      <form onSubmit={onSubmit} className="card p-6 mt-6 grid gap-4 max-w-md">
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <input className="border rounded-xl px-3 py-2" type="text" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="border rounded-xl px-3 py-2" type="email" required placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="border rounded-xl px-3 py-2" type="password" required placeholder="At least 6 characters" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading?"Creating…":"Create account"}</button>
        <div className="text-sm text-slate-600">Already have an account? <a className="link" href="/auth/sign-in">Sign in</a></div>
      </form>
    </main>
  );
}
