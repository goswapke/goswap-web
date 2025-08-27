// app/api/admin/summary/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [users, vehicles] = await Promise.all([
      prisma.user.findMany({
        select: { id: true, email: true, role: true, createdAt: true },
        orderBy: { createdAt: "desc" },
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
