import { SiteFooter } from "@/components/site-footer";
import { Analytics } from "@vercel/analytics/react";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/toaster";
import { baseURL } from "@/lib/config";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(baseURL),
  title: {
    default: "echo – Verv",
    template: "%s | echo – Verv",
  },
  description:
    "Nettsiden til å verve seg i undergrupper til echo – Linjeforeningen for informatikk ved Universitetet i Bergen.",
  keywords: ["echo", "linjeforening", "informatikk", "lesesalen", "bergen"],
  icons: {
    apple: "/apple-touch-icon.png",
    icon: "/favicon-32x32.png",
    shortcut: "/favicon16x16.png",
  },
  manifest: "/site.webmanifest",
  viewport: "width=device-width, initial-scale=1.0",
  themeColor: "#ffeabb",
  appleWebApp: {
    title: "echo – Verv",
  },
} satisfies Metadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen antialiased flex flex-col text-gray-900",
          inter.className
        )}
      >
        <SiteHeader />
        <div className="flex-1 py-14">{children}</div>
        <SiteFooter />
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
