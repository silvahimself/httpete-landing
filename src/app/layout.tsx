import { GeistSans } from "geist/font/sans";
import "~/styles/globals.css";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "HttPete | The Ultimate API Testing and Documentation Tool",
  description: "HttPete is a cutting-edge API client that combines the functionality of API testing tools like Postman with seamless documentation capabilities. Open-source and packed with AI-powered features, HttPete makes APIs great again!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  keywords: [
    "HttPete",
    "API testing tool",
    "API documentation",
    "open source API client",
    "Postman alternative",
    "API client with AI",
    "HttPete features",
    "API workflow automation",
    "API collections import",
    "API testing and documentation"
  ],
  openGraph: {
    title: "HttPete | The Ultimate API Testing and Documentation Tool",
    description:
      "Simplify your API workflows with HttPete, the all-in-one API client for testing, documenting, and managing APIs with ease. AI-powered, open-source, and community-driven.",
    url: "https://httpete.dev", // Update with your actual domain
    siteName: "HttPete",
    images: [
      {
        url: "https://4h8dx3lodh.ufs.sh/f/5VzIfIO6yTtGyVOHuFShGSbxpocvdO2lHB3AsiTCLP8KND0R",
        width: 1200,
        height: 630,
        alt: "HttPete - Making APIs Great Again",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HttPete | The Ultimate API Testing and Documentation Tool",
    description:
      "Discover HttPete, the powerful API client that merges testing, documentation, and AI capabilities into one seamless tool. Open-source and free to use!",
    images: [
      {
        url: "https://4h8dx3lodh.ufs.sh/f/5VzIfIO6yTtGyVOHuFShGSbxpocvdO2lHB3AsiTCLP8KND0R",
        alt: "HttPete - API Testing and Documentation Made Easy",
      },
    ],
  },
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <TooltipProvider delayDuration={100}>
      <html lang="en" className={`${GeistSans.variable} scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-slate-500`}>
        <body className="bg-gray-900 text-gray-100 scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-slate-500 h-full">
          {children}
          <Analytics  />
          <SpeedInsights />
        </body>
      </html>
      </TooltipProvider>
  );
}

