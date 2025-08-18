import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  const base = process.env.PESAPAL_BASE_URL, key = process.env.PESAPAL_CONSUMER_KEY, secret = process.env.PESAPAL_CONSUMER_SECRET;
  const callback = process.env.PESAPAL_CALLBACK_URL || "http://localhost:3000/success";
  const { amount, currency = "KES", description = "GoSwap Payment", merchantReference } = await req.json();
  if (!base || !key || !secret) return NextResponse.json({ error: "Pesapal env missing" }, { status: 500 });
  const tr = await fetch(`${base}/api/Auth/RequestToken`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ consumer_key: key, consumer_secret: secret }) });
  const tdata = await tr.json(); const token = tdata.token || tdata.access_token; if (!token) return NextResponse.json({ error: "No token" }, { status: 500 });
  const ref = merchantReference || randomUUID();
  const body = {
    id: ref, currency, amount, description, callback_url: callback, notification_id: "",
    billing_address: { email_address: "customer@example.com", first_name: "Go", last_name: "Swap", phone_number: "0700000000", country_code: "KE" }
  };
  const pr = await fetch(`${base}/api/Transactions/SubmitOrderRequest`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(body) });
  const pdata = await pr.json(); if (!pr.ok) return NextResponse.json({ error: pdata }, { status: 500 });
  return NextResponse.json({ redirect_url: pdata.redirect_url || pdata.redirectUrl, merchant_reference: ref });
}
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  const base = process.env.PESAPAL_BASE_URL, key = process.env.PESAPAL_CONSUMER_KEY, secret = process.env.PESAPAL_CONSUMER_SECRET;
  const callback = process.env.PESAPAL_CALLBACK_URL || "http://localhost:3000/success";
  const { amount, currency = "KES", description = "GoSwap Payment", merchantReference } = await req.json();
  if (!base || !key || !secret) return NextResponse.json({ error: "Pesapal env missing" }, { status: 500 });
  const tr = await fetch(`${base}/api/Auth/RequestToken`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ consumer_key: key, consumer_secret: secret }) });
  const tdata = await tr.json(); const token = tdata.token || tdata.access_token; if (!token) return NextResponse.json({ error: "No token" }, { status: 500 });
  const ref = merchantReference || randomUUID();
  const body = {
    id: ref, currency, amount, description, callback_url: callback, notification_id: "",
    billing_address: { email_address: "customer@example.com", first_name: "Go", last_name: "Swap", phone_number: "0700000000", country_code: "KE" }
  };
  const pr = await fetch(`${base}/api/Transactions/SubmitOrderRequest`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(body) });
  const pdata = await pr.json(); if (!pr.ok) return NextResponse.json({ error: pdata }, { status: 500 });
  return NextResponse.json({ redirect_url: pdata.redirect_url || pdata.redirectUrl, merchant_reference: ref });
}
