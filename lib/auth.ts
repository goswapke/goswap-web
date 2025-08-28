// lib/auth.ts
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { z } from "zod";

/** ───────────────────────── Zod validation ───────────────────────── */
export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const signUpSchema = signInSchema.extend({
  name: z.string().min(1).optional(),
});

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;

export function parseSignIn(raw: unknown): SignInInput | null {
  const p = signInSchema.safeParse(raw);
  return p.success ? p.data : null;
}

export function parseSignUp(raw: unknown): SignUpInput | null {
  const p = signUpSchema.safeParse(raw);
  return p.success ? p.data : null;
}

/** ───────────────────────── Session (JWT cookie) ───────────────────────── */
const COOKIE = "gs_session";
const ALG = "HS256";

export type Session = {
  sub: string; // user id
  role: "TRAVELLER" | "PARTNER" | "ADMIN";
  email: string;
};

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("Missing AUTH_SECRET");
  return new TextEncoder().encode(secret);
}

export async function createSession(s: Session) {
  const token = await new SignJWT(s)
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());

  cookies().set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function readSession(): Promise<Session | null> {
  const c = cookies().get(COOKIE)?.value;
  if (!c) return null;
  try {
    const { payload } = await jwtVerify(c, getSecret());
    return payload as Session;
  } catch {
    return null;
  }
}

export function clearSession() {
  cookies().set(COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 0,
  });
}

/** ───────────────────────── Role → portal helper ───────────────────────── */
export function portalFor(role: Session["role"]) {
  if (role === "PARTNER") return "/partner";
  if (role === "ADMIN") return "/admin";
  return "/app"; // TRAVELLER default
}
