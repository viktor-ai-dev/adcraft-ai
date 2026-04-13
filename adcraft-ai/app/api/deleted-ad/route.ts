import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const formData = await req.formData();
  const id = formData.get("id") as string;

  await prisma.ad.delete({
    where: { id },
  });

  return Response.redirect(new URL("/dashboard", req.url));
}