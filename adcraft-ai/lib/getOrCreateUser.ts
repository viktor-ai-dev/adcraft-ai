
import { prisma } from "@/lib/prisma"

export async function getOrCreateUser(userId: string, email?: string) {
    
    const user = await prisma.user.upsert({
        where: {id: userId},
        update: {},
        create: {
            id: userId,
            email: email || `${userId}@example.com`,
            credits: 5
        },
    });

    return user;
}