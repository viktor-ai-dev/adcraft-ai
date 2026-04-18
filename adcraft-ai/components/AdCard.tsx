"use client";

import { useState } from "react";
import { toast } from "sonner";
import {motion} from "framer-motion"

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
        credentials: "include",
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

  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition">
    <motion.div
      initial = {{opacity: 0, scale: 0.95}}
      animate = {{opacity: 1, scale: 1}}
      whileHover={{scale: 1.03}}
      transition={{duration: 0.3}}
      className="group relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-md hover:shadow-2xl transition overflow-hidden border border-white/40"
    >
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

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              onClick={handleCopy}
              className="bg-black text-white px-4 py-3 rounded-xl shadow hover:shadow-lg transition hover:scale-[1.02]">
                Copy
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              onClick={handleDelete}
              disabled={loading}
              className="bg-black text-white px-4 py-3 rounded-xl shadow hover:shadow-lg transition hover:scale-[1.02]">
                {loading ? "..." : "Delete"}
            </motion.button>

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
    </motion.div>
  </div>
  );
}