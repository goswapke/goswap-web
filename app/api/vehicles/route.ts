import { NextResponse } from "next/server";
import { vehicles } from "@/lib/sampleData";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") as "LEASE" | "SWAP" | null;
  const city = searchParams.get("city")?.toUpperCase() as ("NAIROBI"|"MOMBASA"|"KISUMU") | undefined;

  let data = vehicles;
  if (category) data = data.filter(v => v.category === category);
  if (city) data = data.filter(v => v.city === city);

  return NextResponse.json({ items: data });
}
