// app/api/auth/sign-up/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";
import { createSession, portalFor } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();
    if (!email || !password) return NextResponse.json({ ok: false, error: "Email & password required" }, { status: 400 });

    const user = await prisma.user.create({
      data: {
        email: String(email).toLowerCase().trim(),
        password: await hash(password, 10),
        name: name ? String(name) : undefined,
        role: "TRAVELLER", // default
      },
      select: { id: true, email: true, role: true },
    });

    await createSession({ sub: user.id, email: user.email, role: user.role as any });
    return NextResponse.json({ ok: true, redirect: portalFor(user.role as any) });
  } catch (e: any) {
    if (String(e?.message || "").includes("Unique constraint")) {
      return NextResponse.json({ ok: false, error: "Email already registered" }, { status: 409 });
    }
    return NextResponse.json({ ok: false, error: "Sign-up failed" }, { status: 500 });
  }
}
