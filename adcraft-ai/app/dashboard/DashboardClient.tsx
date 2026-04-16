"use client";

import { useState } from "react";
import AdCard from "@/components/AdCard";

export default function DashboardClient({ initialAds }: any) {
  const [ads, setAds] = useState(initialAds);

  const handleDelete = (id: string) => {
    setAds((prev: any) => prev.filter((ad: any) => ad.id !== id));
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {ads.map((ad: any) => (
        <AdCard key={ad.id} ad={ad} onDelete={handleDelete(ad.id)} />
      ))}
    </div>
  );
}