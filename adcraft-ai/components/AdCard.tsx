"use client";

import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function AdCard({ ad, onDelete }: any) {
  const [hovered, setHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  const images = JSON.parse(ad.images || "[]");

  let headline = null;
  try {
    headline = ad.headlines ? JSON.parse(ad.headlines)[0] : null;
  } catch {}

  // 🧠 ACTIONS

  const handleCopy = () => {
    navigator.clipboard.writeText(ad.description);
    toast.success("Description copied ✨");
  };

  const handleCopyFull = () => {
    const fullAd = `
${headline || ""}
${ad.description}

CTA: ${ad.cta || ""}
    `;
    navigator.clipboard.writeText(fullAd);
    toast.success("Full ad copied 🚀");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = images?.[0];
    link.download = `${ad.name}.png`;
    link.click();

    toast.success("Image downloaded 📸");
  };

  const handleShare = () => {
    // Fake viral UX (portfolio trick)
    toast.success("Shared 🚀 (demo)");
  };

  const handleDelete = async () => {
    if (!confirm("Delete this ad?")) return;

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
    } catch {
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
          className={`absolute top-2 right-2 flex flex-wrap gap-2 transition ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={handleDownload}
            className="bg-black text-white px-2 py-1 rounded text-xs"
          >
            Download
          </button>

          <button
            onClick={handleCopyFull}
            className="bg-black text-white px-2 py-1 rounded text-xs"
          >
            Copy Ad
          </button>

          <button
            onClick={handleShare}
            className="bg-black text-white px-2 py-1 rounded text-xs"
          >
            Share
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-black text-white px-2 py-1 rounded text-xs"
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
      <div className="p-4 space-y-3">

        {/* HEADLINE */}
        {headline && (
          <p className="text-sm font-semibold text-gray-800 line-clamp-2">
            {headline}
          </p>
        )}

        {/* DESCRIPTION */}
        {!headline && (
          <p className="text-xs text-gray-500 line-clamp-2">
            {ad.description}
          </p>
        )}

        {/* CTA */}
        {ad.cta && (
          <span className="inline-block text-[10px] bg-black text-white px-2 py-1 rounded">
            {ad.cta}
          </span>
        )}

        {/* FOOTER */}
        <div className="flex justify-between text-xs text-gray-400 pt-2">
          <span className="capitalize">{ad.style}</span>
          <span>{new Date(ad.createdAt).toLocaleDateString()}</span>
        </div>

      </div>
    </motion.div>
  );
}