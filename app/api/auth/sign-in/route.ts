// app/api/auth/sign-in/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";
import { createSession, portalFor } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({ where: { email: String(email).toLowerCase().trim() } });
    if (!user) return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });

    const ok = await compare(String(password), user.password);
    if (!ok) return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });

    await createSession({ sub: user.id, email: user.email, role: user.role as any });
    return NextResponse.json({ ok: true, redirect: portalFor(user.role as any) });
  } catch {
    return NextResponse.json({ ok: false, error: "Sign-in failed" }, { status: 500 });
  }
}
