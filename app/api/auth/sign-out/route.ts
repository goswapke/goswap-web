// app/api/auth/sign-out/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";

// Support POST (recommended) and GET (convenience)
export async function POST() {
  try {
    await destroySession();
    return NextResponse.json({ ok: true, redirect: "/" });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Sign-out failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await destroySession();
    return NextResponse.json({ ok: true, redirect: "/" });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Sign-out failed" }, { status: 500 });
  }
}
