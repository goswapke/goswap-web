// middleware.ts
import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

const AUTH_ROUTES = [/^\/app(\/|$)/, /^\/partner(\/|$)/, /^\/admin(\/|$)/];

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    // Dev-friendly fallback so you can test locally without crashing.
    if (process.env.NODE_ENV !== "production") return new TextEncoder().encode("dev-secret");
    throw new Error("AUTH_SECRET missing");
  }
  return new TextEncoder().encode(secret);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard portal routes
  const needsAuth = AUTH_ROUTES.some((re) => re.test(pathname));
  if (!needsAuth) return NextResponse.next();

  const token = req.cookies.get("gs_session")?.value;
  if (!token) {
    const url = new URL("/auth/sign-in", req.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  try {
    const { payload } = await jwtVerify(token, getSecret());
    const role = String(payload.role || "");

    if (pathname.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }
    if (pathname.startsWith("/partner") && role !== "PARTNER" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }
    if (pathname.startsWith("/app") && role !== "TRAVELLER" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }

    return NextResponse.next();
  } catch {
    const url = new URL("/auth/sign-in", req.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/app/:path*", "/partner/:path*", "/admin/:path*"],
};
