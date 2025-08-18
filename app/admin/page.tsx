import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

const db: any = prisma; // bypass stale TS types; runtime has .payment

async function getPending() {
  return db.payment.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "desc" },
  });
}

// Server action to mark a payment as PAID
async function markPaid(formData: FormData) {
  "use server";
  const id = String(formData.get("id") || "");
  if (!id) return;
  await db.payment.update({ where: { id }, data: { status: "PAID" } });
  revalidatePath("/admin");
}

export default async function Admin() {
  const rows = await getPending();

  return (
    <div>
      <h2>Admin — Pending Payments</h2>
      {rows.map((p: any) => (
        <form
          key={p.id}
          action={markPaid}
          style={{
            border: "1px solid #ddd",
            padding: 10,
            margin: "10px 0",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontFamily: "monospace" }}>{p.id}</div>
            <div>
              Amount: {p.amount} {p.currency} • Kind: {p.kind} • Ref:{" "}
              {p.pesapalMerchantRef || "-"}
            </div>
          </div>
          <input type="hidden" name="id" value={p.id} />
          <button type="submit">Mark Paid</button>
        </form>
      ))}
      {rows.length === 0 && <p>No pending payments.</p>}
    </div>
  );
}
