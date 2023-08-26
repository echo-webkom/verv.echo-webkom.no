import Makerspace from "@/mdx/makerspace.mdx";
import { Metadata } from "next";

export const metadata = {
  title: "Makerspace",
  description: "Søk verv i Makerspace!",
} satisfies Metadata;

export default function MakerspacePage() {
  return <Makerspace />;
}
