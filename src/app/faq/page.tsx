import FAQ from "@/mdx/faq.mdx";
import { Metadata } from "next";

export const metadata = {
  title: "FAQ",
  description: "Ofte stilte spørsmål",
} satisfies Metadata;

export default function FAQPage() {
  return (
    <div className="flex flex-col max-w-2xl w-full mx-auto px-6">
      <FAQ />
    </div>
  );
}
