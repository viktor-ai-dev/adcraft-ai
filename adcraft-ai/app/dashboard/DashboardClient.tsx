"use client";

import Generator from "@/components/Generator";
import AdCard from "@/components/AdCard";
import { useState } from "react";

export default function DashboardClient({ initialAds }: any) {
  const [ads, setAds] = useState(initialAds);

  const handleDelete = (id: string) => {
    setAds((prev: any) => prev.filter((ad: any) => ad.id !== id));
  };

  return (
    <div className="space-y-8">

      {/* GENERATOR */}
      <Generator />

      {/* SAVED ADS */}
      <div className="grid grid-cols-3 gap-6">
        {ads.map((ad: any) => (
          <AdCard key={ad.id} ad={ad} onDelete={handleDelete} />
        ))}
      </div>

    </div>
  );
}