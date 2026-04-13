"use client";

import { useState } from "react";

export default function AdCard({ ad }: any) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!ad?.prompt) return;

    navigator.clipboard.writeText(ad.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  let images: string[] = [];

  try {
    images = ad.images ? JSON.parse(ad.images) : [];
  } catch (e) {
    images = [];
  }

  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group bg-white">

      {/* IMAGE */}
      <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
        {images.length > 0 ? (
          <img
            src={images[0]}
            alt={ad.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>

      {/* TITLE */}
      <h2 className="font-semibold text-lg">{ad.name}</h2>
      <p className="text-sm text-gray-500">{ad.style}</p>

      {/* ACTIONS */}
      <div className="flex gap-2 mt-3">

        {/* COPY PROMPT */}
        <button
          onClick={handleCopy}
          className="text-xs px-3 py-1 border rounded hover:bg-black hover:text-white transition"
        >
          {copied ? "Copied!" : "Copy prompt"}
        </button>

        {/* DELETE */}
        <button className="text-xs px-3 py-1 border rounded text-red-500 hover:bg-red-500 hover:text-white transition">
          Delete
        </button>

      </div>
    </div>
  );
}