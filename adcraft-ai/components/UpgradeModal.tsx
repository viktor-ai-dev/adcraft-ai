"use client";

import { motion } from "framer-motion";

export default function UpgradeModal({ open, onClose }: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      {/* MODAL */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-2">
          You're out of credits 🚫
        </h2>

        <p className="text-gray-500 mb-6">
          Upgrade your plan to continue generating high-converting ads.
        </p>

        {/* PLANS */}
        <div className="space-y-3">

          <div className="border p-4 rounded-xl hover:border-black transition">
            <h3 className="font-bold">Pro</h3>
            <p className="text-sm text-gray-500">Unlimited ads</p>
            <button className="mt-3 bg-black text-white w-full py-2 rounded">
              Upgrade for $19/mo
            </button>
          </div>

          <div className="border p-4 rounded-xl hover:border-black transition">
            <h3 className="font-bold">Agency</h3>
            <p className="text-sm text-gray-500">Bulk + client mode</p>
            <button className="mt-3 bg-black text-white w-full py-2 rounded">
              Upgrade for $49/mo
            </button>
          </div>

        </div>

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="mt-6 text-sm text-gray-400 hover:underline"
        >
          Maybe later
        </button>
      </motion.div>
    </div>
  );
}