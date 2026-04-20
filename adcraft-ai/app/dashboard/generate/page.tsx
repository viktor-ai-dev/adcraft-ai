"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type AdResult = {
  images: string[];
  headlines: string[];
  primaryTexts: string[];
  cta: string;
};

export default function GeneratePage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [style, setStyle] = useState("luxury");
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<AdResult | null>(null);

  const handleGenerate = async () => {
    if (!name || !description || loading) return;

    setLoading(true);
    setResult(null);

    try {
      // RUN BOTH ENDPOINTS IN PARALLEL
      const [imgRes, textRes] = await Promise.all([
        fetch("/api/generate-images", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, description, style }),
        }),
        fetch("/api/generate-text", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, description, style }),
        }),
      ]);

      const imgData = await imgRes.json();
      const textData = await textRes.json();

      setResult({
        images: imgData.images || [],
        headlines: textData.headlines || [],
        primaryTexts: textData.primaryTexts || [],
        cta: textData.cta || "Shop Now",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
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

        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="border p-3 w-full rounded"
        >
          <option value="luxury">Luxury</option>
          <option value="minimal">Minimal</option>
          <option value="bold">Bold</option>
          <option value="tech">Tech</option>
          <option value="viral">Viral</option>
        </select>

        <motion.button
          onClick={handleGenerate}
          disabled={loading}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          className="bg-black text-white px-4 py-3 rounded-xl shadow"
        >
          {loading ? "Generating..." : "Generate"}
        </motion.button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-sm text-gray-500 space-y-2">
          <p className="animate-pulse">✨ Writing ad copy...</p>
          <p className="animate-pulse">🎨 Generating visuals...</p>
          <p className="animate-pulse">🚀 Finalizing...</p>
        </div>
      )}

      {/* RESULTS */}
      {result && (
        <div className="space-y-8">

          {/* HEADLINES */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-bold mb-2">Headlines</h2>
            <ul className="space-y-2">
              {result.headlines.map((h, i) => (
                <li key={i} className="text-lg font-medium">
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* AD COPY */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-bold mb-2">Primary Texts</h2>
            <div className="space-y-3 text-gray-700">
              {result.primaryTexts.map((t, i) => (
                <p key={i}>{t}</p>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-bold mb-2">CTA</h2>
            <button className="bg-black text-white px-4 py-2 rounded-xl">
              {result.cta}
            </button>
          </div>

          {/* IMAGES */}
          <div>
            <p className="text-sm text-gray-500 mb-3">Generated Creatives</p>

            <div className="grid grid-cols-3 gap-4">
              {result.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="rounded-2xl shadow object-cover h-64 w-full"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}