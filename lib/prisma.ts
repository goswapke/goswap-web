// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

// cache client in dev to avoid creating many instances on hot reload
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// ✅ Export both named and default so either import style works:
// import { prisma } from "@/lib/prisma"
// import prisma from "@/lib/prisma"
export default prisma;
