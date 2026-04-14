"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const styles = [
  { key: "luxury", label: "Luxury", desc: "Premium gold & black" },
  { key: "minimal", label: "Minimal", desc: "Clean white aesthetic" },
  { key: "bold", label: "Bold", desc: "Colorful & loud" },
  { key: "tech", label: "Tech", desc: "Futuristic neon" },
  { key: "viral", label: "Viral", desc: "Social media style" },
];

export default function Home() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState("luxury");

  const handleGenerate = async () => {
    if (loading) return;
    if (!name || !description) return;

    setLoading(true);
    setResult(null);

    try {
      const textRes = await fetch("/api/generate-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, style }),
      });

      const textData = await textRes.json();

      const imageRes = await fetch("/api/generate-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, style }),
      });

      const imageData = await imageRes.json();

      setResult({
        text: textData || {},
        images: imageData?.images || [],
      });
    } catch (error) {
      console.error("GENERATION ERROR:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex justify-center p-8">
      <div className="w-full max-w-3xl space-y-6">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-4xl font-bold">AdCraft AI</h1>
          <p className="text-gray-500">
            Generate high-converting AI ads in seconds
          </p>

          <a href="/dashboard" className="text-blue-500 underline text-sm">
            View Dashboard →
          </a>
        </div>

        {/* INPUT */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">

          {/* STYLE */}
          <div className="grid grid-cols-2 gap-3">
            {styles.map((s) => (
              <div
                key={s.key}
                onClick={() => setStyle(s.key)}
                className={`cursor-pointer border p-4 rounded-xl transition 
                ${
                  style === s.key
                    ? "border-black bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <h3 className="font-bold">{s.label}</h3>
                <p className="text-xs opacity-70">{s.desc}</p>
              </div>
            ))}
          </div>

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

          <button
            disabled={loading}
            onClick={handleGenerate}
            className="bg-black text-white px-4 py-3 rounded w-full hover:opacity-90 active:scale-95 transition disabled:opacity-50"
          >
            {loading ? "Generating ads..." : "Generate Ads"}
          </button>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 animate-pulse">
              ✨ Writing ad copy...
            </p>
            <p className="text-sm text-gray-500 animate-pulse">
              🎨 Generating visuals...
            </p>
            <p className="text-sm text-gray-500 animate-pulse">
              🚀 Finalizing campaign...
            </p>

            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-64 bg-gray-200 animate-pulse rounded-xl"
                />
              ))}
            </div>
          </div>
        )}

        {/* RESULTS */}
        {result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >

            {/* AD PACK */}
            <div className="bg-white p-6 rounded-xl shadow space-y-4">
              <h2 className="text-xl font-bold">Ad Pack</h2>

              {result.text?.headlines && (
                <div>
                  <h3 className="font-semibold mb-1">Headlines</h3>
                  {result.text.headlines.map((h: string, i: number) => (
                    <div key={i} className="bg-gray-100 p-2 rounded mb-1 text-sm">
                      {h}
                    </div>
                  ))}
                </div>
              )}

              {result.text?.primaryTexts && (
                <div>
                  <h3 className="font-semibold mb-1">Primary Text</h3>
                  {result.text.primaryTexts.map((t: string, i: number) => (
                    <div key={i} className="bg-gray-100 p-2 rounded mb-1 text-sm">
                      {t}
                    </div>
                  ))}
                </div>
              )}

              {result.text?.cta && (
                <div>
                  <h3 className="font-semibold mb-1">CTA</h3>
                  <div className="bg-black text-white px-4 py-2 rounded inline-block text-sm">
                    {result.text.cta}
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    JSON.stringify(result.text, null, 2)
                  );
                  toast.success("Ad copied!");
                }}
                className="text-blue-500 text-sm underline"
              >
                Copy Ad Pack
              </button>
            </div>

            {/* IMAGES */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-bold mb-4">
                Generated Ad Variations
              </h2>

              {result.images.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No images generated
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {result.images.map((img: string, i: number) => (
                    <div
                      key={i}
                      className="group relative overflow-hidden rounded-xl shadow"
                    >
                      <motion.img
                        src={img}
                        whileHover={{ scale: 1.05 }}
                        className="h-64 w-full object-cover rounded-xl"
                      />

                      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        Variation {i + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </motion.div>
        )}

      </div>
    </main>
  );
}