import { prisma } from "@/lib/prisma";
import AdCard from "@/components/AdCard";


export default async function DashboardPage() {

  const ads = await prisma.ad.findMany(
  {
    orderBy: { createdAt: "desc" },
  });

  return (
   
  <div className="grid grid-cols-3 gap-4xl">
  {
    ads.map((ad) => (
      <AdCard key={ad.id} ad={ad} />
    ))
  }
  </div>
    
  );
}