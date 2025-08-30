// app/api/auth/sign-in/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";
import { createSession, portalFor } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Invalid credentials." },
        { status: 401 }
      );
    }

    const ok = await compare(password, user.password);
    if (!ok) {
      return NextResponse.json(
        { ok: false, error: "Invalid credentials." },
        { status: 401 }
      );
    }

    // Set session cookie
    await createSession({ userId: user.id, email: user.email, role: user.role });

    // Send the right portal based on role
    return NextResponse.json({ ok: true, redirect: portalFor(user.role as any) });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Failed to sign in" },
      { status: 500 }
    );
  }
}
