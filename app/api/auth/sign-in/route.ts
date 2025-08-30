// app/api/auth/sign-in/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";
import { createSession, portalFor } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
    }
    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
    }

    const ok = await compare(password, user.password);
    if (!ok) {
      return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
    }

    await createSession({ userId: user.id, email: user.email, role: user.role as any });
    const redirect = portalFor(user.role);

    return NextResponse.json({ ok: true, redirect });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Sign-in failed" }, { status: 500 });
  }
}
