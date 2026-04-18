import { prisma } from "@/lib/prisma";
import DashboardClient from "./DashboardClient";
import {auth} from "@clerk/nextjs/server"
import { redirect } from "next/navigation"


export default async function Page() {
 
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const ads = await prisma.ad.findMany({
    where: {userId},
    orderBy: { createdAt: "desc" },
  });

  const user = await prisma.user.findUnique({
    where: {id: userId}
  });
  
  return <DashboardClient initialAds={ads} user={user}/>;
}