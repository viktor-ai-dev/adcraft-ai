"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    if (!image) {
      alert("Ladda upp en bild först");
      return;
    }

    // 1. Upload image (FIXED)
    const formData = new FormData();
    formData.append("file", image);

    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const uploadData = await uploadRes.json();
    const imageUrl = uploadData.secure_url;
    
    // 2. Generate text
    const textRes = await fetch("/api/generate-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    });

    const textData = await textRes.json();

    // 3. Generate images (FIXED)
    const imageRes = await fetch("/api/generate-images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageUrl: uploadData.secure_url,
      }),
    });

    const imageData = await imageRes.json();

    // 4. Save result (FIXED key)
    setResult({
      text: textData,
      images: imageData,
    });
  };

  return (
    <main className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        AdCraft AI
      </h1>

      {/* FILE INPUT (NY) */}
      <input
        type="file"
        className="mb-4"
        onChange={(e) => {
          if (e.target.files) {
            setImage(e.target.files[0]);
          }
        }}
      />

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
        onClick={handleGenerate}
        className="bg-black text-white px-4 py-2"
      >
        Generate Ads
      </button>

      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">Headlines & Copy</h2>
          <pre className="bg-gray-100 p-2 rounded">
            {result.text}
          </pre>

          <h2 className="text-xl font-bold mt-4">Images</h2>
          <div className="grid grid-cols-3 gap-2">
            {result.images?.length > 0 ? 
            (
              result.images.map((img: any, i: number) => (
                <img
                  key={i}
                  src={img}
                  className="rounded-lg"
                />
              ))
            ) : 
            (
              <p>Inga bilder hittades</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}