import { SessionProvider } from "next-auth/react";
import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";
import { auth, getWorkspaces } from "~/server/auth";
import "~/styles/globals.css";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Analytics } from "@vercel/analytics/react"
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';

export const metadata: Metadata = {
  title: "HttPete",
  description: "Making APIs great again!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <TooltipProvider delayDuration={100}>
      <html lang="en" className={`${GeistSans.variable} scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-slate-500`}>
        <body className="bg-gray-900 text-gray-100 scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-slate-500 h-full">
          {children}
          <Analytics  />
        </body>
      </html>
      </TooltipProvider>
    </SessionProvider>
  );
}

