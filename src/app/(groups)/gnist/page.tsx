import Gnist from "@/mdx/gnist.mdx";
import { Metadata } from "next";

export const metadata = {
  title: "Gnist",
  description: "Søk verv i Gnist!",
} satisfies Metadata;

export default function GnistPage() {
  return <Gnist />;
}
