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
            
           <motion.button
              className="bg-black text-white px-4 py-3 rounded-xl shadow hover:shadow-lg transition hover:scale-[1.02]"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}>

              Upgrade for $19/mo
            </motion.button>
          </div>

          <div className="border p-4 rounded-xl hover:border-black transition">
            <h3 className="font-bold">Agency</h3>
            <p className="text-sm text-gray-500">Bulk + client mode</p>

            <motion.button
              className="bg-black text-white px-4 py-3 rounded-xl shadow hover:shadow-lg transition hover:scale-[1.02]"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}>

              Upgrade for $49/mo
            </motion.button>
          </div>

        </div>

        {/* CLOSE */}
        <motion.button
          onClick={onClose}
          className="bg-black text-white px-4 py-3 rounded-xl shadow hover:shadow-lg transition hover:scale-[1.02]"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}>

          Maybe later
        </motion.button>

      </motion.div>
    </div>
  );
}