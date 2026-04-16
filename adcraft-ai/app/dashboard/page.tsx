import { prisma } from "@/lib/prisma";
import DashboardClient from "./DashboardClient";

export default async function Page() {
  const ads = await prisma.ad.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <DashboardClient initialAds={ads} />;
}