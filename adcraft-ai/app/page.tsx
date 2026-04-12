"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState("luxury");

  const handleGenerate = async () => {
    setLoading(true);

    const textRes = await fetch("/api/generate-text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });

    const textData = await textRes.json();

    const imageRes = await fetch("/api/generate-images", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, style }),
    });

    const imageData = await imageRes.json();

    setResult({
      text: textData,
      images: imageData.images,
    });

    setLoading(false);
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
        </div>

        {/* INPUT CARD */}
        <div className="bg-white p-6 rounded-xl shadow space-y-3">

          <select
          className="border p-3 w-full rounded"
          onChange={(e) => setStyle(e.target.value)}>
        
          <option value="luxury">Luxury</option>
          <option value="minimal">Minimal</option>
          <option value="bold">Bold</option>
          <option value="tech">Tech</option>
          <option value="viral">Viral</option>
        </select>

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
            className="bg-black text-white px-4 py-3 rounded w-full disabled:opacity-50"
          >
            {loading ? "Generating ads..." : "Generate Ads"}
          </button>
        </div>

        {/* RESULTS */}
        {result && (
          <div className="space-y-6">

            {/* TEXT */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-bold mb-2">Ad Copy</h2>
              <pre className="text-sm whitespace-pre-wrap text-gray-700">
                {result.text}
              </pre>
            </div>

            {/* IMAGES */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-bold mb-4">
                Generated Ad Variations
              </h2>

              {loading ? (
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-64 bg-gray-200 animate-pulse rounded-xl"
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {result.images?.map((img: string, i: number) => (
                    <div
                      key={i}
                      className="group relative overflow-hidden rounded-xl shadow"
                    >
                      <img
                        src={img}
                        className="w-full h-64 object-cover transform group-hover:scale-105 transition"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                        Variation {i + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </main>
  );
}