import { PrismaClient } from "@prisma/client/extension";

const globalForPrisma = global as any;

export const prisma = globalForPrisma || new PrismaClient();

if(process.env.NODE_ENV !== "production"){
    globalForPrisma.prisma = prisma;
}