import { NextResponse } from "next/server";
export async function POST() {
  const base = process.env.PESAPAL_BASE_URL, key = process.env.PESAPAL_CONSUMER_KEY, secret = process.env.PESAPAL_CONSUMER_SECRET;
  if (!base || !key || !secret) return NextResponse.json({ error: "Pesapal env missing" }, { status: 500 });
  const r = await fetch(`${base}/api/Auth/RequestToken`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ consumer_key: key, consumer_secret: secret }) });
  const d = await r.json(); if (!r.ok) return NextResponse.json({ error: d }, { status: 500 });
  return NextResponse.json({ access_token: d.token || d.access_token });
}
