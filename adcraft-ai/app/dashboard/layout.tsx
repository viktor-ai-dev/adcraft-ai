import { ReactNode } from "react";
import {auth} from "@clerk/nextjs/server"
import { getOrCreateUser } from "@/lib/getOrCreateUser";
import CreditsBar from "@/components/CreditsBar";
import SideBar from "@/components/SideBar";



export default async function DashboardLayout({children}: {children: ReactNode}) {

  //if user doesn't exist, create it first
  const {userId} = await auth();
  const user =   await getOrCreateUser(userId);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 via-white to-gray-100">

      {/* SideBar */}
      <SideBar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <header className="h-16 backdrop-blur-xl bg-white/70 border-b border-white/40 flex items-center justify-between px-6">
          {/* CREDITS BAR */}
          <CreditsBar credits={user.credits} />

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