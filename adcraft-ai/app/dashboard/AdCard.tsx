"use client";

import { useState } from "react";

export default function AdCard({ ad }: any) {
  const [hovered, setHovered] = useState(false);

  const images = JSON.parse(ad.images || "[]");

  return (
    <div
      className="relative group rounded-xl overflow-hidden shadow bg-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* IMAGE */}
      <img
        src={images[0]}
        className="h-48 w-full object-cover transition group-hover:scale-105"
      />

      {/* STYLE BADGE */}
      <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
        {ad.style}
      </div>

      {/* HOVER OVERLAY */}
      {hovered && (
        <div className="absolute inset-0 bg-black/70 flex flex-col justify-between p-3 text-white transition">

          {/* TOP */}
          <div className="text-sm font-semibold">
            {ad.name}
          </div>

          {/* ACTIONS */}
          <div className="flex justify-between text-xs">

            {/* COPY */}
            <button
              onClick={() =>
                navigator.clipboard.writeText(ad.description)
              }
              className="hover:underline"
            >
              Copy Prompt
            </button>

            {/* DELETE */}
            <form action="/api/delete-ad" method="POST">
              <input type="hidden" name="id" value={ad.id} />
              <button className="text-red-400 hover:underline">
                Delete
              </button>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}