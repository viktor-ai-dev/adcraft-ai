"use client";

import { useState } from "react";
import { toast } from "sonner";
import UpgradeModal from "@/components/UpgradeModal";
import { motion } from "framer-motion";

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
    if (loading) return;

    if (!name || !description) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      toast.loading("Generating your ads...", { id: "gen" });

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

      if (!imageRes.ok) {
        if (imageData.error === "No credits left") {
          toast.error("You're out of credits");
          setShowUpgrade(true);
        } else {
          toast.error(imageData.error);
        }

        setLoading(false);
        return;
      }

      toast.dismiss();
      toast.success("Ad generated successfully", { id: "gen" });

      // ✅ NO RELOAD → better UX
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
          <motion.button
            key={s.key}
            onClick={() => setStyle(s.key)}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className={`px-3 py-1 rounded border ${
              style === s.key ? "bg-black text-white" : ""
            }`}
          >
            {s.label}
          </motion.button>
        ))}
      </div>

      {/* SELECTED STYLE */}
      <p className="text-xs text-gray-500">
        Selected style: <span className="font-semibold">{style}</span>
      </p>

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

      {/* BUTTON */}
      <motion.button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-black text-white px-4 py-3 rounded-xl shadow hover:shadow-lg transition hover:scale-[1.02]"
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
      >
        {loading ? "Generating..." : "Generate Ads"}
      </motion.button>

      {/* RESULT */}
      {result && (
        <div className="space-y-6">

          {/* TEXT RESULT */}
          {result.text && (
            <div className="bg-gray-50 p-4 rounded-xl space-y-4">

              {/* HEADLINES */}
              {result.text.headlines && (
                <div>
                  <p className="text-xs text-gray-400 mb-1">Headlines</p>
                  {result.text.headlines.map((h: string, i: number) => (
                    <div
                      key={i}
                      className="bg-white p-2 rounded mb-1 text-sm shadow-sm"
                    >
                      {h}
                    </div>
                  ))}
                </div>
              )}

              {/* PRIMARY TEXT */}
              {result.text.primaryTexts && (
                <div>
                  <p className="text-xs text-gray-400 mb-1">Primary Text</p>
                  {result.text.primaryTexts.map((t: string, i: number) => (
                    <div
                      key={i}
                      className="bg-white p-2 rounded mb-1 text-sm shadow-sm"
                    >
                      {t}
                    </div>
                  ))}
                </div>
              )}

              {/* CTA */}
              {result.text.cta && (
                <div>
                  <p className="text-xs text-gray-400 mb-1">CTA</p>
                  <div className="inline-block bg-black text-white px-3 py-1 rounded text-sm">
                    {result.text.cta}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* IMAGES */}
          <div className="grid grid-cols-3 gap-2">
            {result.images.map((img: string, i: number) => (
              <img key={i} src={img} className="rounded" />
            ))}
          </div>

        </div>
      )}

      <UpgradeModal
        open={showUpgrade}
        onclose={() => setShowUpgrade(false)}
      />
    </div>
  );
}