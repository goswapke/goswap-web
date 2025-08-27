// app/api/seed/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  if (!process.env.SEED_TOKEN || token !== process.env.SEED_TOKEN) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [vehicleCount, userCount] = await Promise.all([
      prisma.vehicle.count(),
      prisma.user.count(),
    ]);
    if (vehicleCount > 0 && userCount > 0) {
      return NextResponse.json({ ok: true, message: "Already seeded", vehicleCount, userCount });
    }

    // Admin user
    const email = "admin@goswap.co.ke";
    const passwordHash = await hash("goswap123", 10);
    await prisma.user.upsert({
      where: { email },
      update: {},
      create: { email, password: passwordHash, name: "GoSwap Admin", role: "admin" },
    });

    // Vehicles
    const vehicles = [
      { make:"Toyota", model:"RAV4", year:2019, fuelType:"Petrol", transmission:"Automatic", locationCity:"Nairobi", imageUrl:"https://images.unsplash.com/photo-1619767886558-efdc259cde1a", description:"Clean SUV, ideal for city and weekend trips.", listingType:"SWAP" as const },
      { make:"Mazda", model:"CX-5", year:2020, fuelType:"Petrol", transmission:"Automatic", locationCity:"Mombasa", imageUrl:"https://images.unsplash.com/photo-1549921296-3b4a3d4b8b36", description:"Comfortable coastal cruiser, well maintained.", listingType:"SWAP" as const },
      { make:"Subaru", model:"Forester", year:2018, fuelType:"Petrol", transmission:"Automatic", locationCity:"Kisumu", imageUrl:"https://images.unsplash.com/photo-1583121274602-3e2820f36e55", description:"All-wheel drive, great for trips around the lake.", listingType:"SWAP" as const },
      { make:"Nissan", model:"X-Trail", year:2017, fuelType:"Diesel", transmission:"Automatic", locationCity:"Nairobi", imageUrl:"https://images.unsplash.com/photo-1605559424843-9e4f1a5b4f9c", description:"Spacious family SUV with good ground clearance.", listingType:"SWAP" as const },
      { make:"Honda", model:"CR-V", year:2019, fuelType:"Petrol", transmission:"Automatic", locationCity:"Mombasa", imageUrl:"https://images.unsplash.com/photo-1503376780353-7e6692767b70", description:"Reliable and efficient; perfect for coastal drives.", listingType:"SWAP" as const },
    ];

    for (const v of vehicles) {
      const id = `${v.make}_${v.model}_${v.year}_${v.locationCity}`.toLowerCase().replace(/\s+/g, "-");
      await prisma.vehicle.upsert({ where: { id }, update: v, create: { ...v, id } });
    }

    const [v2, u2] = await Promise.all([prisma.vehicle.count(), prisma.user.count()]);
    return NextResponse.json({ ok: true, message: "Seeded", vehicleCount: v2, userCount: u2 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Seed failed" }, { status: 500 });
  }
}
