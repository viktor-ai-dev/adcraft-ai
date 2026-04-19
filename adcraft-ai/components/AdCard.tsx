"use client";

import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

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

      onDelete?.(ad.id);
    } catch (err) {
      toast.error("Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      className="group bg-white rounded-2xl shadow-md overflow-hidden border border-white/40"
    >
      {/* IMAGE */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative h-48 overflow-hidden"
      >
        <img
          src={images?.[0] || "/placeholder.png"}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* ACTIONS */}
        <div
          className={`absolute top-2 right-2 flex gap-2 transition ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={handleCopy}
            className="bg-black text-white px-4 py-2 rounded-xl text-xs"
          >
            Copy
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded-xl text-xs"
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

        <div className="flex justify-between text-xs text-gray-400">
          <span>{ad.style}</span>
          <span>{new Date(ad.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </motion.div>
  );
}