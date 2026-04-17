import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  
  const body = await req.json();
  const id = body.id;

  console.log("Delete id:", id);

  await prisma.ad.delete({
    where: { id: id },
  });

  return new Response(null,{status:200});
}