import { Metadata } from "next";

import FAQ from "@/mdx/faq.mdx";

export const metadata = {
  title: "FAQ",
  description: "Ofte stilte spørsmål",
} satisfies Metadata;

export default function FAQPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col px-6">
      <FAQ />
    </div>
  );
}
