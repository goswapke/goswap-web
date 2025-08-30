// app/api/auth/sign-in/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";
import { createSession, portalFor } from "@/lib/auth";
import { z } from "zod";

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => ({}));
    const parsed = SignInSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.errors.map(e => e.message).join(", ") },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, password: true, role: true },
    });

    if (!user) {
      return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
    }

    const ok = await compare(password, user.password);
    if (!ok) {
      return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
    }

    // IMPORTANT: use userId, not sub
    await createSession({ userId: user.id, email: user.email, role: user.role });

    return NextResponse.json({ ok: true, redirect: portalFor(user.role) });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Sign-in failed. Please try again." },
      { status: 500 }
    );
  }
}
