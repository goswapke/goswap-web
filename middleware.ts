import { withAuth } from "next-auth/middleware";
export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const path = req.nextUrl.pathname;
      const publicRoutes = ["/", "/success", "/cancel", "/auth/signin", "/auth/signup"];
      if (publicRoutes.includes(path) || path.startsWith("/api")) return true;
      if (!token) return false;
      if (path.startsWith("/admin")) return (token as any).isAdmin === true;
      return !!token;
    }
  }
});
export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
