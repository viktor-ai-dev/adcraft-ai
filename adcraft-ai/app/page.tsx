"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("")
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
   
    setLoading(true);

    // 2. Generate text
    const textRes = await fetch("/api/generate-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    });

    const textData = await textRes.json();

    // 3. Generate images
    const imageRes = await fetch("/api/generate-images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    });

    const imageData = await imageRes.json();
    
    if(imageData){
      setLoading(false);
    }

    setResult({
      text: textData,
      images: imageData.image,
    });
  };

  return (
    <main className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">AdCraft AI</h1>

      <input
        placeholder="Product name"
        className="border p-2 w-full mb-2"
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        placeholder="Product description"
        className="border p-2 w-full mb-2"
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        disabled={loading}
        onClick={handleGenerate}
        className="bg-black text-white px-4 py-2 disabled:opacity-50"
      >
        {loading ? "Generating.." : "Generate Ads"}
      </button>

      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">Headlines & Copy</h2>
          <pre className="bg-gray-100 p-2 rounded">
            {result.text}
          </pre>

          <h2 className="text-xl font-bold mt-4">Images</h2>
          <div className="grid grid-cols-3 gap-2">
            {result.images?.length > 0 ? (
              result.images.map((img: any, i: number) => (
              <img
                key={i}
                src={
                  img.startsWith("data:")
                    ? img
                    : `data:image/png;base64,${img}`
                }
                className="rounded"
              />
              ))
            ) : (
              <p>Inga bilder hittades</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}