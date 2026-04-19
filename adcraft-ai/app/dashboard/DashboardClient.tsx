"use client";

import AdCard from "@/components/AdCard";
import { useState, useMemo } from "react";
import { Ad } from "@prisma/client";
import { motion } from "framer-motion";

export default function DashboardClient({
  initialAds,
  user,
}: {
  initialAds: any;
  user: any;
}) {
  const [ads, setAds] = useState(initialAds);

  const totalAds = ads.length;

  // 📊 Last 7 days (fixed + safe)
  const last7Days = useMemo(() => {
    return Array.from({ length: 7 })
      .map((_, i) => {
        const day = new Date();
        day.setDate(day.getDate() - i);

        const count = initialAds.filter((ad: Ad) => {
          const d = new Date(ad.createdAt);
          return d.toDateString() === day.toDateString();
        }).length;

        return {
          day: day.toLocaleDateString("en-US", { weekday: "short" }),
          ads: count || 0,
        };
      })
      .reverse();
  }, [initialAds]);

  // 📈 Style stats
  const topStyle = useMemo(() => {
    const styleCount: Record<string, number> = {};

    initialAds.forEach((ad: any) => {
      styleCount[ad.style] = (styleCount[ad.style] || 0) + 1;
    });

    return Object.entries(styleCount).sort((a, b) => b[1] - a[1])[0];
  }, [initialAds]);

  const handleDelete = (id: string) => {
    setAds((prev: any) => prev.filter((ad: any) => ad.id !== id));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
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
              className="bg-white p-5 rounded-xl shadow"
            >
              <p className="text-xs text-gray-500">{item.label}</p>
              <h2 className="text-2xl font-bold">{item.value}</h2>
            </motion.div>
          ))}
        </div>

        {/* CHART */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold mb-4">Last 7 Days</h2>

          <div className="flex items-end gap-4 h-40">
            {last7Days.map((d, i) => (
              <div key={i} className="flex flex-col items-center flex-1">
                <div
                  className="bg-black w-full rounded"
                  style={{ height: `${(d.ads || 0) * 20}px` }}
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

        {/* ADS */}
        <div>
          <h2 className="text-xl font-bold mb-4">Your Ads</h2>

          {ads.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl shadow">
              <h2 className="text-xl font-semibold">No ads yet</h2>
              <p className="text-gray-500 text-sm mt-2">
                Generate your first ad to get started
              </p>

              <a
                href="/dashboard/generate"
                className="inline-block mt-4 bg-black text-white px-5 py-2 rounded-xl hover:scale-105 transition"
              >
                Create Ad
              </a>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-3 gap-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
            >
              {ads.map((ad: any) => (
                <AdCard key={ad.id} ad={ad} onDelete={handleDelete} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}