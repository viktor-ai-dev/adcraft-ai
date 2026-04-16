import { prisma } from "@/lib/prisma";
import DashboardClient from "./DashboardClient";
import {auth} from "@clerk/nextjs/server"
import { redirect } from "next/navigation"


export default async function Page() {
 
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  console.log("USER ID:", userId);
  const ads = await prisma.ad.findMany({
    where: {userId},
    orderBy: { createdAt: "desc" },
  });
  
  return <DashboardClient initialAds={ads} />;
}