import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/db";
import { compare } from "bcryptjs";
import { z } from "zod";

const schema = z.object({ email: z.string().email(), password: z.string().min(6) });

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(raw) {
        const p = schema.safeParse(raw); if (!p.success) return null;
        const { email, password } = p.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;
        const ok = await compare(password, user.password);
        if (!ok) return null;
        return { id: user.id, email: user.email, name: user.name, role: user.role, isAdmin: user.isAdmin } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) { (token as any).role = (user as any).role; (token as any).isAdmin = (user as any).isAdmin; }
      return token;
    },
    async session({ session, token }) {
      if (session.user) { (session.user as any).role = (token as any).role; (session.user as any).isAdmin = (token as any).isAdmin; }
      return session;
    },
  },
};
