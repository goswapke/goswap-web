// lib/auth.ts
import { z } from "zod";
import { compare } from "bcryptjs";
import { prisma } from "./prisma";

export const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export async function authenticate(raw: unknown) {
  const p = schema.safeParse(raw);
  if (!p.success) return null;

  const { email, password } = p.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const ok = await compare(password, user.password);
  if (!ok) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name ?? null,
    role: user.role ?? "traveler",
  };
}

