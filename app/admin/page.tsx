import { prisma } from "@/lib/db";

async function getPending(){ return prisma.payment.findMany({ where:{ status:"PENDING" }, orderBy:{ createdAt:"desc" } }); }
async function markPaid(id:string){ "use server"; await prisma.payment.update({ where:{ id }, data:{ status:"PAID" } }); }

export default async function Admin(){
  const rows = await getPending();
  return (<div>
    <h2>Admin — Pending Payments</h2>
    {rows.map(p=>(
      <form action={markPaid.bind(null,p.id)} key={p.id} style={{border:"1px solid #ddd",padding:10,margin:"10px 0",display:"flex",justifyContent:"space-between"}}>
        <div><div style={{fontFamily:"monospace"}}>{p.id}</div><div>Amount: {p.amount} {p.currency} • Kind: {p.kind} • Ref: {p.pesapalMerchantRef||"-"}</div></div>
        <button type="submit">Mark Paid</button>
      </form>
    ))}
    {rows.length===0 && <p>No pending payments.</p>}
  </div>);
}
