import Webkom from "@/mdx/webkom.mdx";
import { Metadata } from "next";

export const metadata = {
  title: "Webkom",
  description: "Søk verv i Webkom!",
} satisfies Metadata;

export default function WebkomPage() {
  return <Webkom />;
}
