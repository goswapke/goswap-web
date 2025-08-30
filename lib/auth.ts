// lib/auth.ts
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "gs_session";
const ALG = "HS256";

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV !== "production") return new TextEncoder().encode("dev-secret");
    throw new Error("AUTH_SECRET missing");
  }
  return new TextEncoder().encode(secret);
}

export function portalFor(role?: string | null) {
  switch (role) {
    case "ADMIN":
      return "/admin";
    case "PARTNER":
      return "/partner";
    default:
      return "/app";
  }
}

export async function createSession(payload: {
  userId: string;
  email: string;
  role: "ADMIN" | "PARTNER" | "TRAVELLER";
}) {
  const token = await new SignJWT({
    uid: payload.userId,
    email: payload.email,
    role: payload.role,
  })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());

  // Set cookie
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return token;
}

export async function destroySession() {
  cookies().delete(COOKIE_NAME);
}

export async function getSession() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as {
      uid: string;
      email: string;
      role: "ADMIN" | "PARTNER" | "TRAVELLER";
      iat: number;
      exp: number;
    };
  } catch {
    return null;
  }
}
