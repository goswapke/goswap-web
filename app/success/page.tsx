"use client";
import { useEffect, useState } from "react";
export default function Success(){
  const [status,setStatus]=useState("Checking payment…");
  useEffect(()=>{ const p=new URLSearchParams(location.search);
    const tracking=p.get("orderTrackingId")||p.get("OrderTrackingId")||"";
    const ref=p.get("merchant_reference")||p.get("MerchantReference")||"";
    if(!tracking||!ref){ setStatus("Missing payment info"); return; }
    fetch("/api/pesapal/status",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({orderTrackingId:tracking,merchantRef:ref})})
    .then(r=>r.json()).then(d=>setStatus(d.ok?"Payment confirmed":"Payment failed")).catch(()=>setStatus("Payment check error"));
  },[]);
  return (<div style={{textAlign:"center"}}><h2>Success</h2><p>{status}</p></div>);
}
