// app/api/auth/sign-up/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";
import { createSession, portalFor } from "@/lib/auth";
import { Role } from "@prisma/client";
import { z } from "zod";

const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().optional(),
  // Allow selecting a role during testing; default to TRAVELLER
  role: z.enum(["TRAVELLER", "PARTNER", "ADMIN"]).optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => ({}));
    const parsed = SignUpSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.errors.map(e => e.message).join(", ") },
        { status: 400 }
      );
    }

    const { email, password, name, role } = parsed.data;
    const passwordHash = await hash(password, 10);
    const roleValue: Role = (role as Role) ?? "TRAVELLER";

    const user = await prisma.user.create({
      data: {
        email,
        password: passwordHash,
        name: name ?? null,
        role: roleValue,
      },
      select: { id: true, email: true, role: true },
    });

    // IMPORTANT: use userId, not sub
    await createSession({ userId: user.id, email: user.email, role: user.role });

    return NextResponse.json({ ok: true, redirect: portalFor(user.role) });
  } catch (e: any) {
    const msg = String(e?.message || "");
    if (msg.includes("Unique constraint") || msg.toLowerCase().includes("unique")) {
      return NextResponse.json(
        { ok: false, error: "That email is already registered." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { ok: false, error: "Sign-up failed. Please try again." },
      { status: 500 }
    );
  }
}
