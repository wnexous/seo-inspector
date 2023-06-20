import { PrismaClient } from "@prisma/client";
// export const Database = !Database ? new PrismaClient() : Database;

let prisma: PrismaClient;

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}

//@ts-ignore
if (!globalThis.prisma) {
  //@ts-ignore
  globalThis.prisma = new PrismaClient();
} //@ts-ignore
prisma = globalThis.prisma;

export const Database = prisma;
