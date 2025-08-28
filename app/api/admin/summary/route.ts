// app/api/admin/summary/route.ts
export const runtime = "nodejs";
export const revalidate = 0;                 // never cache
export const dynamic = "force-dynamic";      // always run on server

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { readSession } from "@/lib/auth";

export async function GET() {
  // Require an ADMIN session (defense-in-depth in addition to middleware)
  const session = await readSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [users, vehicles] = await Promise.all([
      prisma.user.findMany({
        select: { id: true, email: true, role: true, createdAt: true },
        orderBy: { createdAt: "desc" },
        take: 100, // keep response light
      }),
      prisma.vehicle.findMany({
        select: {
          id: true,
          make: true,
          model: true,
          year: true,
          locationCity: true,
          listingType: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
        take: 100,
      }),
    ]);

    return NextResponse.json({ ok: true, users, vehicles });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "Failed to load admin data" },
      { status: 500 }
    );
  }
}
