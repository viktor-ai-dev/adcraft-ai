"use client";

import { useState } from "react";
import { toast } from "sonner";
import UpgradeModal from "@/components/UpgradeModal"

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
  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleGenerate = async () => {
    if(loading) return;
    if (!name || !description){
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    setResult(null);

    try {

      toast.loading("Generating your ads...", {id: "gen"})

      const textRes = await fetch("/api/generate-text", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, style }),
      });

      const textData = await textRes.json();

      const imageRes = await fetch("/api/generate-images", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, style }),
      });

      const imageData = await imageRes.json();

      if (!imageRes.ok){
        const err = await imageRes.json();
        
        if(err.error == "No credits left"){
          toast.error("You're out of credits");
          setShowUpgrade(true);
        } else {
          toast.error(err.error);
        }

        setLoading(false);
        return;
      }

      // Success
      toast.dismiss();
      toast.success("Ad generated successfully", {id: "gen"});
      window.location.reload();

      console.log("TEXT:", textData);
      console.log("IMAGES:", imageData);

      setResult({
        text: textData,
        images: imageData.images || [],
      });

    } catch (error) {
      toast.dismiss();
      toast.error("Unexpected error occurred");
      console.error(error);

    } finally {
      setLoading(false);
    }
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

      <UpgradeModal open={showUpgrade} onclose={ ()=>{setShowUpgrade(false)} } />
    </div>
  );
}