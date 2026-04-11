import Image from "next/image";
import { useState } from "react";
import { text } from "stream/consumers";

export default function Home() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);


  const handleGenerate = async () => {

    // 1. TEXT
    const textResult = await fetch("/api/generate-text", {
      method: "POST",
      body: JSON.stringify({name, description}),
    });

    const textData = await textResult.json();

    // 2. IMAGE (placeholder)
    const imageResult = await fetch("/api/generate-images/", {
      method: "POST",
      body: JSON.stringify({}),
    });

    const imageData = await imageResult.json();

    setResult({
      text: textData,
      image: imageData
    });
  };

  return (
    <main className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        AdCraft AI
      </h1>

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
          <h2 className="text-xl font-bold">Headlines</h2>
          <pre>{result.text}</pre>

          <h2 className="text-xl font-bold mt-4">Images</h2>
          <div className="grid grid-cols-3 gap-2">
            {result.images.map((img: string, i: number) => (
              <img key={i} src={img} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
