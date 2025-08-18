import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const base = process.env.PESAPAL_BASE_URL;
    const key = process.env.PESAPAL_CONSUMER_KEY;
    const secret = process.env.PESAPAL_CONSUMER_SECRET;
    const { orderTrackingId } = await req.json();

    if (!base || !key || !secret) {
      return NextResponse.json({ ok: false, error: "Env" }, { status: 500 });
    }

    const tr = await fetch(`${base}/api/Auth/RequestToken`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ consumer_key: key, consumer_secret: secret }),
    });
    const tdata = await tr.json();
    const token = tdata.token || tdata.access_token;
    if (!token) return NextResponse.json({ ok: false, error: "No token" }, { status: 500 });

    const sr = await fetch(
      `${base}/api/Transactions/GetTransactionStatus?orderTrackingId=${encodeURIComponent(orderTrackingId)}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const s = await sr.json();
    const status = String(s.payment_status || s.status || "").toUpperCase();
    const ok = status.includes("PAID") || status.includes("COMPLETED");

    return NextResponse.json({ ok, raw: s });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
