"use client";

import Generator from "@/components/Generator";
import AdCard from "@/components/AdCard";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import { useState } from "react";

export default function DashboardClient({initialAds}:any) {

  const [ads, setAds] = useState(initialAds);

  const handleDelete = (id: string) => {
    setAds((prev: any) => prev.filter((ad: any) => ad.id !== id));
  };

  return (
    <div className="space-y-8">

      {/* Analytics - Currently Fake Data */}
      <AnalyticsDashboard/>
    
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-bold mb-2">Insights</h2>

        <ul className="text-sm text-gray-600 space-y-1">
          <li>🔥 Your latest ads are performing +18% better</li>
          <li>📊 Tech style ads have highest CTR</li>
          <li>⚠️ You are running low on credits</li>
        </ul>
      </div>

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