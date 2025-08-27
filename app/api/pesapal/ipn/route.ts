import { NextResponse } from "next/server";
// If you want to update DB status here, uncomment the next line and ensure "@/lib/db" exists and exports `prisma`
// import { prisma } from "@/lib/db";

export const runtime = "nodejs";

type Payload = Record<string, string>;

async function parseBody(req: Request): Promise<Payload> {
  const ct = (req.headers.get("content-type") || "").toLowerCase();

  // JSON body
  if (ct.includes("application/json")) {
    const data = await req.json().catch(() => ({}));
    return (data ?? {}) as Payload;
  }

  // Form-encoded or multipart
  if (ct.includes("application/x-www-form-urlencoded") || ct.includes("multipart/form-data")) {
    const form = await req.formData();
    const obj: Payload = {};
    // FormData is iterable at runtime; cast for TS
    for (const [key, value] of (form as unknown as Iterable<[string, FormDataEntryValue]>)) {
      obj[key] = typeof value === "string" ? value : (value as File).name;
    }
    return obj;
  }

  // Fallback: try to parse querystring-ish text
  const text = await req.text().catch(() => "");
  const obj: Payload = {};
  for (const pair of text.split("&")) {
    if (!pair) continue;
    const [k, ...rest] = pair.split("=");
    if (!k) continue;
    obj[decodeURIComponent(k)] = decodeURIComponent(rest.join("=") || "");
  }
  return obj;
}

async function handler(req: Request) {
  const payload = await parseBody(req);

  // Pull common Pesapal fields regardless of case/format
  const statusRaw =
    payload.status ||
    payload.status_code ||
    payload["status_code"] ||
    payload["payment_status_description"] ||
    "";
  const status = String(statusRaw).toUpperCase();

  const merchantReference =
    payload.merchant_reference ||
    payload["merchant_reference"] ||
    payload["order_tracking_id"] ||
    payload["reference"] ||
    "";

  // If you want to persist the status in your DB, uncomment this block and ensure your Prisma model has a unique or identifiable field
  /*
  if (merchantReference) {
    if (status === "PAID" || status === "COMPLETED" || status === "0200") {
      await prisma.payment.updateMany({ where: { merchantReference }, data: { status: "PAID" } });
    } else if (status === "FAILED" || status === "0401" || status === "CANCELLED") {
      await prisma.payment.updateMany({ where: { merchantReference }, data: { status: "FAILED" } });
    }
  }
  */

  // Always respond 200 so Pesapal marks the IPN as received
  return NextResponse.json({ ok: true, status, merchantReference });
}

export async function POST(req: Request) {
  return handler(req);
}

export async function GET(req: Request) {
  // Some IPN services do verification pings via GET
  return handler(req);
}
