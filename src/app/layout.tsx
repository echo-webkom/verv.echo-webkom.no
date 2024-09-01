import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/toaster";
import { BASE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(BASE_URL),
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
  appleWebApp: {
    title: "echo – Verv",
  },
} satisfies Metadata;

export const viewport = {
  themeColor: "#ffeabb",
  width: "device-width",
  initialScale: 1,
} satisfies Viewport;

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={cn("flex min-h-screen flex-col text-gray-900 antialiased", inter.className)}>
        <SiteHeader />
        <div className="flex-1 py-14">{children}</div>
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  );
}
