"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Landing() {

  const [step, setStep] = useState<"idle" | "loading" | "done">("idle");

  useEffect(() => {
    let alive = true;

    const loop = async () => {
      while (alive) {
        setStep("loading");
        await new Promise(r => setTimeout(r, 2000));

        setStep("done");
        await new Promise(r => setTimeout(r, 3000));
      }
    };

    loop();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">

      {/* HERO */}
      <section className="text-center py-28 px-6 max-w-5xl mx-auto relative">

        {/* GLOW BACKGROUND */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-200/30 via-blue-200/30 to-pink-200/30 blur-3xl opacity-60" />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-bold tracking-tight"
        >
          Create high-converting ads <br />
          with AI in seconds
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 mt-6 text-lg max-w-xl mx-auto"
        >
          Generate product ads, visuals, and copy instantly.
          Built for modern ecommerce brands.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex justify-center gap-4"
        >
          <a
            href="/dashboard"
            className="bg-black text-white px-6 py-3 rounded-xl shadow hover:scale-105 transition"
          >
            Launch App
          </a>

          <a
            href="#demo"
            className="border px-6 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            View Demo
          </a>
        </motion.div>
      </section>

      {/* DEMO SECTION */}
      <section id="demo" className="max-w-5xl mx-auto px-6 pb-24">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-6"
        >

        {/* FAKE GENERATOR */}
        <div className="space-y-3">
          <input
            disabled
            value="Luxury Watch"
            className="border p-3 w-full rounded bg-gray-100"
          />

          <textarea
            disabled
            value="Premium gold watch for modern men"
            className="border p-3 w-full rounded bg-gray-100"
          />

          <motion.div
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`px-4 py-3 rounded text-center text-white ${
              step === "done" ? "bg-green-500" : "bg-black"
            }`}
          >
            {step === "loading" && "✨ Generating ads..."}
            {step === "done" && "✅ Ads Generated"}
          </motion.div>
        </div>

        {/* FAKE RESULTS */}
      <motion.div
        className="grid grid-cols-3 gap-4 mt-6"
        initial="hidden"
        animate={step === "done" ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
      {[
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        "https://images.unsplash.com/photo-1519741497674-611481863552",
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
      ].map((src, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl overflow-hidden shadow hover:scale-105 transition bg-white"
        >
          <img
            src={src}
            className="h-40 w-full object-cover"
          />

          <div className="p-3">
            <p className="text-xs text-gray-500">Luxury Ad</p>
            <p className="text-sm font-semibold">Premium Style</p>
          </div>
        </motion.div>
    ))}
      </motion.div>

      </motion.div>
      </section>

      {/* FEATURES */}
      <section className="grid grid-cols-3 gap-6 max-w-5xl mx-auto px-6 pb-20">
        {[
          {
            title: "AI Ad Copy",
            desc: "Generate high-converting headlines instantly",
          },
          {
            title: "Image Generation",
            desc: "Studio-quality product visuals with AI",
          },
          {
            title: "Multi Variations",
            desc: "Get multiple ad versions per product",
          },
        ].map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="p-6 bg-white rounded-2xl shadow hover:shadow-xl transition">

            <h3 className="font-bold mb-2">{f.title}</h3>
            <p className="text-sm text-gray-500">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <section className="text-center py-20 bg-black text-white">
        <h2 className="text-3xl font-bold">
          Start creating ads in seconds
        </h2>

        <a
          href="/dashboard"
          className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-xl hover:scale-105 transition"
        >
          Open Dashboard
        </a>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-400 py-10">
        © {new Date().getFullYear()} AdCraft AI
      </footer>

    </main>
  );
}