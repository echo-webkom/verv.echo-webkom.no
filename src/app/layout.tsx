import "@/styles/globals.css";
import "@mdxeditor/editor/style.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/cn";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "verv",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body className={cn("", inter.className)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
