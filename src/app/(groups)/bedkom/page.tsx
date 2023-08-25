import Bedkom from "@/mdx/bedkom.mdx";
import { Metadata } from "next";

export const metadata = {
  title: "Bedkom",
  description: "Søk verv i Bedkom!",
} satisfies Metadata;

export default function BedkomPage() {
  return <Bedkom />;
}
