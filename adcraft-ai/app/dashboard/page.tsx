import { prisma } from "@/lib/prisma";
import DashboardClient from "./DashboardClient";

export default async function Dashboard() {
  const ads = await prisma.ad.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <DashboardClient initialAds={ads} />;
}