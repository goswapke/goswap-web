import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  const { name, email, phone, password } = await req.json();
  if (!name || !email || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return NextResponse.json({ error: "Email in use" }, { status: 409 });
  const pw = await hash(password, 10);
  const user = await prisma.user.create({ data: { name, email, phone, password: pw, role: "TRAVELER" } });
  return NextResponse.json({ ok: true, id: user.id });
}
