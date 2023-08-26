import ESC from "@/mdx/esc.mdx";
import { Metadata } from "next";

export const metadata = {
  title: "ESC",
  description: "Søk verv i ESC!",
} satisfies Metadata;

export default function ESCPage() {
  return <ESC />;
}
