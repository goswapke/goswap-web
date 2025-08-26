import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json().catch(() => ({}));
  if (!email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  // TODO: replace with real credential check later
  return NextResponse.json({ ok: true, message: "Logged in (stub)", user: { email } });
}
