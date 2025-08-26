import { NextResponse } from "next/server";

// Pesapal will POST IPN updates here (set this URL in your Pesapal dashboard)
export async function POST(req: Request) {
  // Many IPN configs send JSON containing order_tracking_id; some send form data.
  let payload: any = {};
  try {
    const ct = req.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      payload = await req.json();
    } else {
      const form = await req.formData();
      payload = Object.fromEntries(form.entries());
    }
  } catch {
    // ignore
  }

  // TODO: Look up status using /api/pesapal/status and update your DB (Payment/Booking)
  // For now, just acknowledge so Pesapal stops retrying
  return NextResponse.json({ ok: true, received: payload }, { status: 200 });
}
