"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp(){
  const [name,setName]=useState(""), [email,setEmail]=useState(""), [phone,setPhone]=useState(""), [password,setPassword]=useState("");
  const router=useRouter();
  const submit=async(e:React.FormEvent)=>{e.preventDefault();
    const r=await fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email,phone,password})});
    if(r.ok) router.push("/auth/signin"); else alert("Sign up failed");
  };
  return (<div style={{maxWidth:360,margin:"40px auto"}}>
    <h2>Create account</h2>
    <form onSubmit={submit} style={{display:"grid",gap:8}}>
      <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)}/>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)}/>
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <button>Create</button>
    </form>
  </div>);
}
