"use client";

import { useMemo, useState } from "react";

export default function DashboardClient({ initialAds }: any) {
  const [search, setSearch] = useState("");
  const [style, setStyle] = useState("all");
  const [page, setPage] = useState(1);

  const pageSize = 6;

  // 🔎 FILTER + SEARCH LOGIC
  const filtered = useMemo(() => {
    return initialAds.filter((ad: any) => {
      const matchSearch =
        ad.name.toLowerCase().includes(search.toLowerCase());

      const matchStyle =
        style === "all" ? true : ad.style === style;

      return matchSearch && matchStyle;
    });
  }, [search, style, initialAds]);

  // 📄 PAGINATION
  const totalPages = Math.ceil(filtered.length / pageSize);

  const paginated = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="text-gray-500">
            Manage your AI generated ads
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex gap-4 bg-white p-4 rounded-xl shadow">
          <input
            placeholder="Search ads..."
            className="border p-2 rounded w-full"
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <select
            className="border p-2 rounded"
            onChange={(e) => {
              setStyle(e.target.value);
              setPage(1);
            }}
          >
            <option value="all">All styles</option>
            <option value="luxury">Luxury</option>
            <option value="minimal">Minimal</option>
            <option value="bold">Bold</option>
            <option value="tech">Tech</option>
            <option value="viral">Viral</option>
          </select>
        </div>

        {/* GRID */}
        {paginated.length === 0 ? (
          <div className="bg-white p-10 rounded-xl text-center">
            No ads found
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {paginated.map((ad: any) => {
              const images = JSON.parse(ad.images);

              return (
                <div
                  key={ad.id}
                  className="bg-white p-4 rounded-xl shadow space-y-3"
                >
                  <div>
                    <h2 className="font-bold">{ad.name}</h2>
                    <p className="text-xs text-gray-500">
                      {ad.style}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {images.map((img: string, i: number) => (
                      <img
                        key={i}
                        src={img}
                        className="h-24 w-full object-cover rounded hover:scale-105 transition"
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  page === i + 1
                    ? "bg-black text-white"
                    : "bg-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}