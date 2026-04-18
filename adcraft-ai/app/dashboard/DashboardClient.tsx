"use client";

import Generator from "@/components/Generator";
import AdCard from "@/components/AdCard";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import { useState } from "react";
import { Ad } from "@prisma/client";
import SkeletonCard from "@/components/SkeletonCard";
import { motion } from "framer-motion"

export default function DashboardClient({initialAds, user}: {initialAds:any, user:any}) {

  const [ads, setAds] = useState(initialAds);
  const totalAds = initialAds.lengt;

  const last7Days = Array.from({length: 7}).map((_,i) =>{

    const day = new Date();
    day.setDate(day.getDay()-i);

    const count = initialAds.filter((ad:Ad) => {
      const d = new Date(ad.createdAt);
      d.toDateString() === day.toDateString();
    }).lengt;

    return {
      day: day.toLocaleDateString("en-US",{weekday: "short"}), 
      ads: count,
    };
  }).reverse();
   
  // StyleCount
  const styleCount: Record<string, number> = {};
  initialAds.forEach((element:any) => {
    styleCount[element.style] = (styleCount[element.style] || 0) +1;
  });

  const topStyle = Object.entries(styleCount).sort((a,b) => b[1]-a[1])[0];

  const handleDelete = (id: string) => {
    setAds((prev: any) => prev.filter((ad: any) => ad.id !== id));
  };

  return (
    <motion.div
    initial={{opacity: 0, y:10}}
    animate={{opacity: 1, y:0}}
    transition={{duration: 0.4}}
    >
      <div className="space-y-6">

        {/* KPI */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Ads Generated", value: totalAds },
            { label: "Credits Left", value: user?.credits ?? 0 },
            { label: "Top Style", value: topStyle?.[0] || "N/A" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-5 rounded-xl shadow cursor-pointer"
            >
              <p className="text-xs text-gray-500">{item.label}</p>
              <h2 className="text-2xl font-bold">{item.value}</h2>
            </motion.div>
          ))}
        </div>

        {/* SIMPLE CHART */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold mb-4">Last 7 Days</h2>

          <div className="flex items-end gap-4 h-40">
            {last7Days.map((d, i) => (
              <div key={i} className="flex flex-col items-center flex-1">
                <div
                  className="bg-black w-full rounded"
                  style={{ height: `${d.ads * 20}px` }}
                />
                <span className="text-xs mt-2">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* INSIGHTS */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold mb-2">Insights</h2>

          <ul className="text-sm text-gray-600 space-y-1">
            <li>📊 You created {totalAds} ads</li>
            <li>🔥 Most used style: {topStyle?.[0] || "N/A"}</li>
            <li>⚠️ Credits left: {user?.credits ?? 0}</li>
          </ul>
        </div>

        {/* ADS GRID */}
        <div>
          <h2 className="text-xl font-bold mb-4">Your Ads</h2>

            <motion.div
              className="grid grid-cols-3 gap-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    delayChildren: 0.08,
                  },
                },
              }}>

              {initialAds.length === 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  { [1,2,3].map(i => <SkeletonCard key={i}/>) }
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {initialAds.map((ad:any) => (
                    <AdCard key={ad.id} ad={ad} />
                  ))}
                </div>
              )}
            </motion.div>
         
        </div>
      </div>
    </motion.div>
  );
}