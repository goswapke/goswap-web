import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

async function getToken(base: string, key: string, secret: string) {
  const r = await fetch(`${base}/api/Auth/RequestToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ consumer_key: key, consumer_secret: secret })
  });
  const j = await r.json();
  if (!r.ok || !(j.token || j.access_token)) throw new Error("Pesapal token error");
  return j.token || j.access_token;
}

export async function POST(req: Request) {
  const base = process.env.PESAPAL_BASE_URL;
  const key = process.env.PESAPAL_CONSUMER_KEY;
  const secret = process.env.PESAPAL_CONSUMER_SECRET;
  const callback = process.env.PESAPAL_CALLBACK_URL;
  const notificationId = process.env.PESAPAL_IPN_ID || "";

  if (!base || !key || !secret || !callback) {
    return NextResponse.json({ error: "Pesapal env missing" }, { status: 500 });
  }

  const { amount, currency = "KES", description = "GoSwap Payment", merchantReference } =
    await req.json().catch(() => ({}));

  if (!amount) return NextResponse.json({ error: "amount required" }, { status: 400 });

  const token = await getToken(base, key, secret);
  const ref = merchantReference || randomUUID();

  const body = {
    id: ref,
    currency,
    amount,
    description,
    callback_url: callback,
    notification_id: notificationId,
    billing_address: {
      email_address: "customer@example.com",
      first_name: "Go",
      last_name: "Swap",
      phone_number: "0700000000",
      country_code: "KE"
    }
  };

  const pr = await fetch(`${base}/api/Transactions/SubmitOrderRequest`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body)
  });

  const pdata = await pr.json();
  if (!pr.ok) return NextResponse.json({ error: pdata }, { status: 500 });

  return NextResponse.json({
    redirect_url: pdata.redirect_url || pdata.redirectUrl,
    merchant_reference: ref
  });
}
