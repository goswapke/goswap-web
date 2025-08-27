import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  const base = process.env.PESAPAL_BASE_URL ?? "";              // e.g. https://pay.pesapal.com  (live) or https://cybqa.pesapal.com (sandbox)
  const key = process.env.PESAPAL_CONSUMER_KEY ?? "";
  const secret = process.env.PESAPAL_CONSUMER_SECRET ?? "";
  const callback =
    process.env.PESAPAL_CALLBACK_URL ??
    `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/success`;
  const notificationId = process.env.PESAPAL_IPN_ID ?? "";

  if (!base || !key || !secret || !callback) {
    return NextResponse.json(
      { error: "Missing Pesapal env vars (BASE_URL, KEY, SECRET, CALLBACK_URL)" },
      { status: 500 }
    );
  }

  const { amount, currency = "KES", description = "GoSwap Payment", merchantReference } =
    await req.json();

  // 1) Auth: get token
  const tr = await fetch(`${base}/api/Auth/RequestToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ consumer_key: key, consumer_secret: secret }),
    cache: "no-store",
  });
  const tdata = await tr.json();
  const token = tdata.token || tdata.access_token;
  if (!tr.ok || !token) {
    return NextResponse.json(
      { error: "Pesapal token error", details: tdata },
      { status: 502 }
    );
  }

  // 2) Create order
  const ref = merchantReference || randomUUID();
  const body = {
    id: ref,
    currency,
    amount,
    description,
    callback_url: callback,
    notification_id: notificationId, // your IPN ID from Pesapal dashboard
    billing_address: {
      email_address: "customer@example.com",
      first_name: "Go",
      last_name: "Swap",
      phone_number: "0700000000",
      country_code: "KE",
    },
  };

  const pr = await fetch(`${base}/api/Transactions/SubmitOrderRequest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const pdata = await pr.json();
  if (!pr.ok) {
    return NextResponse.json(
      { error: "Pesapal order error", details: pdata },
      { status: 502 }
    );
  }

  return NextResponse.json({
    redirect_url: pdata.redirect_url || pdata.redirectUrl,
    merchant_reference: ref,
  });
}
