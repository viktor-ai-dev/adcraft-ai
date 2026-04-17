"use client";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const fakeData = [
  { day: "Mon", ads: 2 },
  { day: "Tue", ads: 5 },
  { day: "Wed", ads: 3 },
  { day: "Thu", ads: 8 },
  { day: "Fri", ads: 6 },
  { day: "Sat", ads: 10 },
  { day: "Sun", ads: 7 },
];

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6">

      {/* KPI CARDS */}
      <div className="grid grid-cols-4 gap-4">

        {[
          { title: "Ads Generated", value: "124", change: "+12%" },
          { title: "Impressions", value: "48.2K", change: "+22%" },
          { title: "CTR", value: "3.8%", change: "+4%" },
          { title: "Conversions", value: "1,204", change: "+9%" },
        ].map((card) => (
          <div
            key={card.title}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <p className="text-xs text-gray-500">{card.title}</p>
            <h2 className="text-2xl font-bold mt-1">{card.value}</h2>
            <p className="text-green-500 text-xs mt-1">
              {card.change} this week
            </p>
          </div>
        ))}
      </div>

      {/* CHART */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-bold mb-4">Ad Performance</h2>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={fakeData}>
            <XAxis dataKey="day" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="ads"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* TOP ADS */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-bold mb-4">Top Performing Ads</h2>

        <div className="space-y-3">

          {[
            { name: "Luxury Watch", ctr: "5.2%" },
            { name: "Tech Gadget", ctr: "4.8%" },
            { name: "Minimal Lamp", ctr: "4.1%" },
          ].map((ad, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-gray-50 p-3 rounded"
            >
              <span className="text-sm">{ad.name}</span>
              <span className="text-green-500 text-sm font-semibold">
                {ad.ctr}
              </span>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
}