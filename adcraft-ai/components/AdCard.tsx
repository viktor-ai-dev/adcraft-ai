"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function AdCard({ ad, onDelete }: any) {
  const [hovered, setHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  const images = JSON.parse(ad.images || "[]");

  const handleCopy = () => {
    navigator.clipboard.writeText(ad.description);
    toast.success("Copied to clipboard ✨");
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("Delete this ad?");
    if (!confirmDelete) return;

    setLoading(true);

    try {
      await fetch("/api/delete-ad", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: ad.id }),
      });

      toast.success("Ad deleted 🗑️");

      // 🔥 Optimistic update (ingen reload)
      onDelete(ad.id);

    } catch (err) {
      toast.error("Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
    >
      {/* IMAGE */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={images?.[0] || "/placeholder.png"}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />

        {/* ACTIONS */}
        <div
          className={`absolute top-2 right-2 flex gap-2 transition ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={handleCopy}
            className="bg-white text-xs px-2 py-1 rounded shadow hover:bg-gray-100"
          >
            Copy
          </button>

          <button
            disabled={loading}
            onClick={handleDelete}
            className="bg-red-500 text-white text-xs px-2 py-1 rounded shadow hover:bg-red-600 disabled:opacity-50"
          >
            {loading ? "..." : "Delete"}
          </button>
        </div>

        {/* TITLE */}
        <div className="absolute bottom-2 left-2 text-white text-sm font-semibold">
          {ad.name}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        <p className="text-xs text-gray-500 line-clamp-2">
          {ad.description}
        </p>

        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>{ad.style}</span>
          <span>
            {new Date(ad.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}