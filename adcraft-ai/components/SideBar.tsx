"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SideBar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const nav = [
    { name: "Dashboard", href: "/dashboard", icon: "🧠" },
    { name: "Generate", href: "/dashboard/generate", icon: "✨" },
    { name: "Analytics", href: "/dashboard/analytics", icon: "📊" },
    { name: "Settings", href: "/dashboard/settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-64 backdrop-blur-xl bg-white/70 border-r border-white/40 shadow-lg hidden md:flex flex-col justify-between">
      
      <div>
        <div className="p-6 text-xl font-bold border-black">
          AdCraft AI
        </div>

        <nav className="p-4 space-y-2 text-sm">
          {nav.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded
                ${
                  pathname === item.href
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <span>{item.icon}</span>
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t">
        {mounted ? <UserButton /> : null}
      </div>
    </aside>
  );
}