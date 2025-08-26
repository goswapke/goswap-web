import { NextResponse } from "next/server";

async function getToken(base: string, key: string, secret: string) {
  const r = await fetch(`${base}/api/Auth/RequestToken`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ consumer_key: key, consumer_secret: secret })
  });
  const j = await r.json();
  if (!r.ok || !(j.token || j.access_token)) throw new Error("Pesapal token error");
  return j.token || j.access_token;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const trackingId = searchParams.get("order_tracking_id");
  const base = process.env.PESAPAL_BASE_URL;
  const key = process.env.PESAPAL_CONSUMER_KEY;
  const secret = process.env.PESAPAL_CONSUMER_SECRET;

  if (!base || !key || !secret) return NextResponse.json({ error: "Pesapal env missing" }, { status: 500 });
  if (!trackingId) return NextResponse.json({ error: "order_tracking_id required" }, { status: 400 });

  const token = await getToken(base, key, secret);
  const r = await fetch(`${base}/api/Transactions/GetTransactionStatus?orderTrackingId=${encodeURIComponent(trackingId)}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const j = await r.json();
  if (!r.ok) return NextResponse.json({ error: j }, { status: 500 });
  return NextResponse.json(j);
}

