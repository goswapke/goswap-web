import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, phone, password } = await req.json().catch(() => ({}));
  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  // TODO: replace with real DB create (Prisma) later
  return NextResponse.json({ ok: true, message: "Registered (stub)", user: { name, email, phone } });
}
