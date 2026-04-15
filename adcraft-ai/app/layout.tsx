import type { Metadata } from "next";
import { ClerkProvider, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AdCraft AI",
  description: "AI Ad Generator SaaS",
};

export default function RootLayout({children}: {children: React.ReactNode;}) {

  const { userId } = auth();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

          {/* NAVBAR */}
          <header className="flex justify-between items-center p-6 max-w-6xl mx-auto">
            <h1 className="font-bold text-xl">AdCraft AI</h1>

            <div className="flex items-center gap-4">
            {
              !userId ? (
                <>
                  <SignInButton />
                  <SignUpButton>
                    <button className="bg-black text-white px-4 py-2 rounded-lg">
                      Sign Up
                    </button>
                  </SignUpButton>
                </>
              ) : ( <UserButton />)
            }
            </div>
          </header>

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}