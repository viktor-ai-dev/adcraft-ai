import { ReactNode } from "react";
import { UserButton } from "@clerk/nextjs";
import { POST } from "../api/deleted-ad/route";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col justify-between">

        {/* LOGO */}
        <div>
          <div className="p-6 text-xl font-bold border-b">
            AdCraft AI
          </div>

          {/* NAV */}
          <nav className="p-4 space-y-2 text-sm">
            <a
              href="/dashboard"
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              🧠 Dashboard
            </a>

            <a
              href="#"
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              ✨ Generate
            </a>

            <a
              href="#"
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              📊 Analytics
            </a>

            <a
              href="#"
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              ⚙️ Settings
            </a>
          </nav>
        </div>

        {/* USER */}
        <div className="p-4 border-t">
          <UserButton />
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">

          <h1 className="font-semibold">
            Dashboard
          </h1>

          <div className="text-sm text-gray-500">
            AdCraft AI SaaS
          </div>
        </header>

        {/* CONTENT */}
        <main className="p-6">
          {children}
        </main>

      </div>
    </div>
  );
}