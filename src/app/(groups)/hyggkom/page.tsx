import Hyggkom from "@/mdx/hyggkom.mdx";
import { Metadata } from "next";

export const metadata = {
  title: "Hyggkom",
  description: "Søk verv i Hyggkom!",
} satisfies Metadata;

export default function HyggkomPage() {
  return <Hyggkom />;
}
