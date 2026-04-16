"use client";

import { useState } from "react";

const styles = [
  { key: "luxury", label: "Luxury" },
  { key: "minimal", label: "Minimal" },
  { key: "bold", label: "Bold" },
  { key: "tech", label: "Tech" },
  { key: "viral", label: "Viral" },
];

export default function Generator() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [style, setStyle] = useState("luxury");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    if (!name || !description || loading) return;

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

      console.log("TEXT:", textData);
      console.log("IMAGES:", imageData);

      setResult({
        text: textData,
        images: imageData.images || [],
      });

    } catch (err) {
      console.error("GEN ERROR:", err);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">

      {/* STYLE */}
      <div className="flex gap-2 flex-wrap">
        {styles.map((s) => (
          <button
            key={s.key}
            onClick={() => setStyle(s.key)}
            className={`px-3 py-1 rounded border ${
              style === s.key ? "bg-black text-white" : ""
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* INPUTS */}
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
        onClick={handleGenerate}
        disabled={loading}
        className="bg-black text-white px-4 py-3 rounded w-full"
      >
        {loading ? "Generating..." : "Generate Ads"}
      </button>

      {/* RESULT */}
      {result && (
        <div className="space-y-4">

          <pre className="bg-gray-100 p-2 text-sm rounded">
            {JSON.stringify(result.text, null, 2)}
          </pre>

          <div className="grid grid-cols-3 gap-2">
            {result.images.map((img: string, i: number) => (
              <img key={i} src={img} className="rounded" />
            ))}
          </div>

        </div>
      )}

    </div>
  );
}