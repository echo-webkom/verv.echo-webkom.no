import Tilde from "@/mdx/tilde.mdx";
import { Metadata } from "next";

export const metadata = {
  title: "Tilde",
  description: "Søk verv i Tilde!",
} satisfies Metadata;

export default function TildePage() {
  return <Tilde />;
}
