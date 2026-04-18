"use client";

import { useState } from "react";
import { motion } from "framer-motion"

export default function GeneratePage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!name || !description || loading) return;

    setLoading(true);

    try {
      const res = await fetch("/api/generate-images", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });

      const data = await res.json();
      setImages(data.images || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">

      <h1 className="text-2xl font-bold">Generate Ads</h1>

      {/* INPUT */}
      <div className="bg-white p-6 rounded-xl shadow space-y-3">
        <input
          placeholder="Product name"
          className="border p-3 w-full rounded"
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Product description"
          className="border p-3 w-full rounded"
          onChange={(e) => setDescription(e.target.value)}
        />

        <motion.button
          onClick={handleGenerate}
          disabled={loading}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          className="bg-black text-white px-4 py-3 rounded-xl shadow hover:shadow-lg transition hover:scale-[1.02]"
        >
          {loading ? "Generating..." : "Generate"}
        </motion.button>
      </div>

      {/* RESULTS */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              className="rounded-xl shadow"
            />
          ))}
        </div>
      )}

      {/* Loading animation */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-gray-500 space-y-2"
        >
          <p className="animate-pulse">✨ Writing ad copy...</p>
          <p className="animate-pulse">🎨 Generating visuals...</p>
          <p className="animate-pulse">🚀 Finalizing...</p>
        </motion.div>
      )}
    </div>
  );
}