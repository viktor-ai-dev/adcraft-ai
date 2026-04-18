import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import {motion} from "framer-motion"


export default async function SettingsPage() {
  const { userId } = auth();

  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return (
    <div className="space-y-6 max-w-xl">

      <h1 className="text-2xl font-bold">Settings</h1>

      {/* USER INFO */}
      <div className="bg-white p-6 rounded-xl shadow space-y-2">
        <p className="text-sm text-gray-500">User ID</p>
        <p className="text-sm font-mono">{userId}</p>
      </div>

      {/* PLAN */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold mb-2">Plan</h2>
        <p className="text-sm text-gray-500">Free Plan</p>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          className="mt-4 bg-black text-white px-4 py-2 rounded"
        >
           Upgrade (coming soon)
        </motion.button>
      </div>

      {/* CREDITS */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold mb-2">Credits</h2>
        <p className="text-sm text-gray-500">
          {user?.credits ?? 0} remaining
        </p>
      </div>

    </div>
  );
}